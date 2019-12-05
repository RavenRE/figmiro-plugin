import {IController} from 'utils/Controller';
import {AuthController} from 'modules/auth';
import {AuthByLoginAndPasswordController} from 'modules/authByLoginAndPassword';
import {BoardsController} from 'modules/boards';
import {SettingsController} from 'modules/settings';

export class RootController {
  [key: string]: IController;
  authController: AuthController;
  authByLoginAndPasswordController: AuthByLoginAndPasswordController;
  boardsController: BoardsController;
  settingsController: SettingsController;

  constructor() {
    this.authController = new AuthController(this);
    this.authByLoginAndPasswordController = new AuthByLoginAndPasswordController(this);
    this.boardsController = new BoardsController();
    this.settingsController = new SettingsController(this);
  }
}

export const rootController = new RootController();
