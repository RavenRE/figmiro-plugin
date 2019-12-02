import {action, observable} from 'mobx';
import {RootController} from 'rootController';
import {Board} from 'modules/boards';
import {requestSyncAll, requestSyncSelection} from './settings.service';

enum SyncTypes {
  'all',
  'selection'
}
type SyncType = keyof typeof SyncTypes;

export class SettingsController {
  @observable itemsToSync: SyncType = 'all';

  constructor(private readonly rootController: RootController) {}

  @action.bound sync(): void {
    switch (this.itemsToSync) {
      case 'all':
        this.syncAll();
        break;
      case 'selection':
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
}
