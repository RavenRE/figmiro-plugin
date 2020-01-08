import {action, observable} from 'mobx';
import {IController} from 'utils/Controller';
import {RootController} from 'rootController';
import {SettingsSelectionType, Widgets} from './settings-selection.entity';
import {
  getSelectionTypes,
  createImagesInMiro,
  clearCache,
  getImages, updateCache
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
    this.totalAmount = 0;
    this.syncedAmount = 0;

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

    const widgets = await createImagesInMiro(
      {
        boardId: selectedBoard.id,
        images,
        scale: needScale
      },
        progressEvent => {
        this.totalAmount = progressEvent.total;
        this.syncedAmount = progressEvent.loaded;
      }
    );
    await updateCache(widgets);
  }

  @action.bound reset(): void {
    this.selectionType = SettingsSelectionType.ALL;
    this.syncedAmount = 0;
    this.totalAmount = 0;
    clearCache();
  }
}
