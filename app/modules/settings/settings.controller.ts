import {action, computed, observable} from 'mobx';
import {RootController} from 'rootController';
import {IController} from 'utils/Controller';
import {
  cancelCreateImagesInMiro,
  clearCache,
  createImagesInMiro,
  getImages,
  getProgressStages,
  updateCache
} from './settings.service';
import {SyncProgressStage} from './settings.entity';
import {SyncErrorType} from './settings.errors';

export class SettingsController implements IController {
  totalSyncStages = getProgressStages().length;
  timer?: NodeJS.Timeout;
  @observable doneSyncStages: SyncProgressStage[] = [];
  @observable fetching = false;
  @observable error?: SyncErrorType;

  constructor(private readonly rootController: RootController) {}

  @action.bound async sync(): Promise<void> {
    try {
      this.fetching = true;
      this.resetDoneSyncStages();
      this.resetErrors();

      const {
        boardsController: {selectedBoard},
        settingsAdditionsController: {openBoardLink, needOpenMiroBoard, needScale},
        settingsSelectionController: {selectionType}
      } = this.rootController;
      if (!selectedBoard) return;

      this.goToSyncStage(SyncProgressStage.INITIAL);
      this.goToSyncStage(SyncProgressStage.IMAGES_EXPORTING);
      const images = await getImages({
        boardId: selectedBoard.id,
        selectionType
      });

      this.goToSyncStage(SyncProgressStage.IMAGE_SENDING_TO_MIRO);
      this.timer = setTimeout(() => {
        this.goToSyncStage(SyncProgressStage.LONG_PROCESSING);
      }, 6000);
      const widgets = await createImagesInMiro(
        {
          boardId: selectedBoard.id,
          images,
          scale: needScale
        }
      );
      clearTimeout(this.timer);
      this.goToSyncStage(SyncProgressStage.LONG_PROCESSING);
      this.goToSyncStage(SyncProgressStage.CACHE_UPDATING);
      await updateCache(widgets);
      if (needOpenMiroBoard) openBoardLink();
    } catch (error) {
      this.error = error.status;
      this.resetDoneSyncStages();
    } finally {
      this.fetching = false;
    }
  }

  cancelSync = (): void => {
    if (
      !this.currentSyncStage ||
      !cancelCreateImagesInMiro
    ) return;
    if (this.currentSyncStage === SyncProgressStage.IMAGE_SENDING_TO_MIRO) {
      cancelCreateImagesInMiro();
    }
  };

  @computed get doneStagesAmount(): number {
    return this.doneSyncStages.length;
  }

  @computed get currentSyncStage(): SyncProgressStage | undefined {
    if (!this.doneSyncStages.length || !this.fetching) return;
    return this.doneSyncStages[0];
  }

  @computed get isCancelableStage(): boolean {
    const cancelableStages = [
      SyncProgressStage.IMAGE_SENDING_TO_MIRO
    ];
    return !!this.currentSyncStage && cancelableStages.includes(this.currentSyncStage);
  }

  @action.bound reset() {
    if (this.fetching) return;

    this.fetching = false;
    const {
      boardsController,
      settingsAdditionsController,
      settingsSelectionController
    } = this.rootController;
    boardsController.resetSelected();
    settingsAdditionsController.reset();
    settingsSelectionController.reset();
    clearCache();
    this.resetDoneSyncStages();
    this.resetErrors();
  }

  @action.bound resetDoneSyncStages(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.doneSyncStages = [];
  }

  @action.bound resetErrors(): void {
    this.error = undefined;
  }

  @action.bound private goToSyncStage(stage: SyncProgressStage): void {
    if (this.doneSyncStages.includes(stage)) return;
    this.doneSyncStages = [stage, ...this.doneSyncStages];
  }
}
