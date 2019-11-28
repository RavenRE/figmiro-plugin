import {action} from 'mobx';
import {RootController} from 'rootController';
import {Board} from 'modules/boards';
import {requestSyncAll} from './settings.service';

export class SettingsController {
  constructor(private readonly rootController: RootController) {}

  @action.bound syncAll(): void {
    if (!this.selectedBoard) return;
    const {
      authController: {stateValue}
    } = this.rootController;
    if (!stateValue) return;
    requestSyncAll(stateValue, this.selectedBoard);
  }

  get selectedBoard(): Board | undefined {
    return this.rootController.boardsController.selectedBoard;
  }
}
