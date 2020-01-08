import {action, observable, computed} from 'mobx';
import {RootController} from 'rootController';
import {IController} from 'utils/Controller';
import {clearCache, createImagesInMiro, getImages, getProgressStages, updateCache} from './settings.service';
import {SyncProgressStage} from './settings.entity';

export class SettingsController implements IController {
  totalSyncStages = getProgressStages().length;
  @observable doneSyncStages: SyncProgressStage[] = [];
  @observable fetching = false;
  @observable error = '';

  constructor(
    private readonly rootController: RootController
  ) {}

  @action.bound async sync(): Promise<void> {
    try {
      this.fetching = true;
      this.resetDoneSyncStages();

      const {
        boardsController: {selectedBoard},
        settingsAdditionsController: {openBoardLink, needOpenMiroBoard, needScale},
        settingsSelectionController: {selectionType}
      } = this.rootController;
      if (!selectedBoard) return;

      this.goToSyncStage(SyncProgressStage.IMAGES_EXPORTING);
      const images = await getImages({
        boardId: selectedBoard.id,
        selectionType
      });

      this.goToSyncStage(SyncProgressStage.IMAGE_SENDING_TO_MIRO);
      const widgets = await createImagesInMiro(
        {
          boardId: selectedBoard.id,
          images,
          scale: needScale
        }
      );

      this.goToSyncStage(SyncProgressStage.CACHE_UPDATING);
      await updateCache(widgets);
      if (needOpenMiroBoard) openBoardLink();
    } catch (e) {
      this.error = e;
      this.resetDoneSyncStages();
    } finally {
      this.fetching = false;
    }
  }

  @computed get doneStagesAmount(): number {
    return this.doneSyncStages.length;
  }

  @computed get currentSyncStage(): SyncProgressStage | undefined {
    if (!this.doneSyncStages.length || !this.fetching) return;
    return this.doneSyncStages[0];
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
  }

  @action.bound private goToSyncStage(stage: SyncProgressStage): void {
    this.doneSyncStages = [stage, ...this.doneSyncStages];
  }

  @action.bound private resetDoneSyncStages(): void {
    this.doneSyncStages = [];
  }
}
