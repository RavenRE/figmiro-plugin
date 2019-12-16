import {RootController} from 'rootController';
import {IController} from 'utils/Controller';

export class SettingsController implements IController {

  constructor(private readonly rootController: RootController) {}

  sync = (): void => {
    const {
      settingsAdditionsController: {
        apply
      }
    } = this.rootController;
    apply();
  };

  reset = (): void => {
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
