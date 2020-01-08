import {observable, action} from 'mobx';
import {RootController} from 'rootController';
import {IController} from 'utils/Controller';
import {getImages, createImagesInMiro, clearCache, updateCache} from './settings.service';

export class SettingsController implements IController {
  @observable fetching = false;
  @observable error = '';

  constructor(
    private readonly rootController: RootController
  ) {}

  @action.bound async sync(): Promise<void> {
    try {
      this.fetching = true;
      const {
        boardsController: {selectedBoard},
        settingsAdditionsController: {openBoardLink, needOpenMiroBoard, needScale},
        settingsSelectionController: {selectionType}
      } = this.rootController;
      if (!selectedBoard) return;

      const images = await getImages({
        boardId: selectedBoard.id,
        selectionType
      });

      const widgets = await createImagesInMiro(
        {
          boardId: selectedBoard.id,
          images,
          scale: needScale
        }
      );
      await updateCache(widgets);
      if (needOpenMiroBoard) openBoardLink();
    } catch (e) {
      this.error = e;
    } finally {
      this.fetching = false;
    }
  }

  reset = (): void => {
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
  };
}
