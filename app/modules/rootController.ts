import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';
import {AuthController} from 'modules/auth';
import {BoardsController} from 'modules/boards';
import {SettingsController} from 'modules/settings';
import {AuthByLoginAndPasswordController} from 'modules/authByLoginAndPassword/authByLoginAndPassword.controller';

export class RootController {
  authController: AuthController;
  authByLoginAndPasswordController: AuthByLoginAndPasswordController;
  boardsController: BoardsController;
  settingsController: SettingsController;

  constructor() {
    this.authController = new AuthController();
    this.authByLoginAndPasswordController = new AuthByLoginAndPasswordController();
    this.boardsController = new BoardsController();
    this.settingsController = new SettingsController(this);
  }
}

export const rootController = new RootController();
export type InjectedProps = {
  [ROOT_CONTROLLER_KEY]: RootController;
};
