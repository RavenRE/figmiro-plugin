import {IController} from 'utils/Controller';
import {MainController} from 'modules/main';
import {IconsController} from 'modules/icons';
import {AuthController} from 'modules/auth';
import {AuthByLoginAndPasswordController} from 'modules/auth-by-login-and-password';
import {BoardsController} from 'modules/boards';
import {SettingsController} from 'modules/settings';
import {SettingsSelectionController} from 'modules/settings-selection';
import {SettingsAdditionsController} from 'modules/settings-additions';

export class RootController {
  [key: string]: IController;

  mainController: MainController;
  iconsController: IconsController;
  authController: AuthController;
  authByLoginAndPasswordController: AuthByLoginAndPasswordController;
  boardsController: BoardsController;
  settingsController: SettingsController;
  settingsAdditionsController: SettingsAdditionsController;
  settingsSelectionController: SettingsSelectionController;

  constructor() {
    this.mainController = new MainController(this);
    this.iconsController = new IconsController();

    this.authController = new AuthController(this);
    this.authByLoginAndPasswordController = new AuthByLoginAndPasswordController(this);

    this.boardsController = new BoardsController();

    this.settingsController = new SettingsController(this);
    this.settingsAdditionsController = new SettingsAdditionsController(this);
    this.settingsSelectionController = new SettingsSelectionController(this);
  }
}

export const rootController = new RootController();
