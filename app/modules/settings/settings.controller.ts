import {action} from 'mobx';
import {RootController} from 'rootController';
import {Board} from 'modules/boards';
import {IController} from 'utils/Controller';
import {requestSyncAll, requestSyncSelection} from './settings.service';

export class SettingsController implements IController {

  constructor(private readonly rootController: RootController) {}

  // @action.bound sync(): void {
  //   switch (this.itemsToSync) {
  //     case SyncType.ALL:
  //       this.syncAll();
  //       break;
  //     case SyncType.SELECTION:
  //       this.syncSelection();
  //       break;
  //   }
  // }

  @action.bound syncAll(): void {
    if (this.selectedBoard) {
      requestSyncAll(this.selectedBoard);
    }
  }

  @action.bound syncSelection(): void {
    if (this.selectedBoard) {
      requestSyncSelection(this.selectedBoard);
    }
  }

  get selectedBoard(): Board | undefined {
    return this.rootController.boardsController.selectedBoard;
  }

  reset() {}
}
