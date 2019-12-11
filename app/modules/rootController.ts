import {IController} from 'utils/Controller';
import {AuthController} from 'modules/auth';
import {AuthByLoginAndPasswordController} from 'modules/authByLoginAndPassword';
import {BoardsController} from 'modules/boards';
import {SettingsController} from 'modules/settings';
import {SettingsSelectionController} from 'modules/settings-selection';

export class RootController {
  [key: string]: IController;
  authController: AuthController;
  authByLoginAndPasswordController: AuthByLoginAndPasswordController;
  boardsController: BoardsController;
  settingsController: SettingsController;
  settingsSelectionController: SettingsSelectionController;

  constructor() {
    this.authController = new AuthController(this);
    this.authByLoginAndPasswordController = new AuthByLoginAndPasswordController(this);

    this.boardsController = new BoardsController();

    this.settingsController = new SettingsController(this);
    this.settingsSelectionController = new SettingsSelectionController();
  }
}

export const rootController = new RootController();
