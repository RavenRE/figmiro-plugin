import {action, observable} from 'mobx';
import {IController} from 'utils/Controller';
import {RootController} from 'rootController';
import {SettingsSelectionType} from './settings-selection.entity';
import {
  getSelectionTypes,
  createImagesInMiro,
  clearCache,
  getImages,
  updateCache
} from './settings-selection.service';

export class SettingsSelectionController implements IController {
  selectionTypes = getSelectionTypes();
  @observable selectionType = SettingsSelectionType.ALL;
  @observable syncedAmount = 0;
  @observable totalAmount = 0;

  constructor(
    private readonly rootController: RootController
  ) {}

  @action.bound changeSelectionType(type: SettingsSelectionType): void {
    this.selectionType = type;
  }

  @action.bound async syncBoards(): Promise<void> {
    try {
      this.resetProgress();
      const {
        boardsController: {selectedBoard},
        settingsAdditionsController: {needScale}
      } = this.rootController;
      if (!selectedBoard) return;

      const images = await getImages({
        board: selectedBoard,
        selectionType: this.selectionType,
        needScale
      });

      this.totalAmount = images.length;
      for (const image of images) {
        const widgets = await createImagesInMiro(
          {
            boardId: selectedBoard.id,
            images: [image],
            scale: needScale
          }
        );
        await updateCache(widgets);
        this.syncedAmount = this.syncedAmount + 1;
      }
    } catch (e) {
      this.resetProgress();
    }
  }

  @action.bound reset(): void {
    this.selectionType = SettingsSelectionType.ALL;
    this.resetProgress();
    clearCache();
  }

  @action.bound resetProgress(): void {
    this.syncedAmount = 0;
    this.totalAmount = 0;
  }
}
