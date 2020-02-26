import {action, observable} from 'mobx';
import {IController} from 'utils/Controller';
import {AppMenuItem} from './menu.entity';
import {getAppMenuItems} from './menu.service';

export class MenuController implements IController {
  appMenuItems = getAppMenuItems();
  @observable selectedAppMenuItem = AppMenuItem.ACCOUNT;

  @action.bound changeAppMenuItem(id: string): void {
    this.selectedAppMenuItem = id as AppMenuItem;
  }

  @action.bound reset(): void {
    this.selectedAppMenuItem = AppMenuItem.ACCOUNT;
  }
}
