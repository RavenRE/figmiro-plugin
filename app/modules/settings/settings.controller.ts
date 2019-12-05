import {action, observable} from 'mobx';
import {RootController} from 'rootController';
import {Board} from 'modules/boards';
import {IController} from 'utils/Controller';
import {requestSyncAll, requestSyncSelection} from './settings.service';

enum SyncType {
  ALL = 'all',
  SELECTION = 'selection'
}

export class SettingsController implements IController {
  @observable itemsToSync: SyncType = SyncType.ALL;

  constructor(private readonly rootController: RootController) {}

  @action.bound sync(): void {
    switch (this.itemsToSync) {
      case SyncType.ALL:
        this.syncAll();
        break;
      case SyncType.SELECTION:
        this.syncSelection();
        break;
    }
  }

  @action.bound changeSyncType(type: SyncType): void {
    this.itemsToSync = type;
  }

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

  @action.bound reset(): void {
    this.itemsToSync = SyncType.ALL;
  }
}
