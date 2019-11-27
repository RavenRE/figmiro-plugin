import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';
import {AuthController} from 'modules/auth';
import {BoardsController} from 'modules/boards';
import {SettingsController} from 'modules/settings';

export class RootController {
  authController: AuthController;
  boardsController: BoardsController;
  settingsController: SettingsController;

  constructor() {
    this.authController = new AuthController(this);
    this.boardsController = new BoardsController(this);
    this.settingsController = new SettingsController(this);
  }
}

export const rootController = new RootController();
export type InjectedProps = {
  [ROOT_CONTROLLER_KEY]: RootController;
};
