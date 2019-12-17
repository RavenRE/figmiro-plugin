import {observable, action} from 'mobx';
import {RootController} from 'rootController';
import {IController} from 'utils/Controller';

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
        settingsAdditionsController: {openBoardLink},
        settingsSelectionController: {syncBoards}
      } = this.rootController;
      await syncBoards();
      openBoardLink();
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
  };
}
