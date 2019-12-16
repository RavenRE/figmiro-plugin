import {action, observable} from 'mobx';
import {IController} from 'utils/Controller';
import {RootController} from 'rootController';
import {SettingsSelectionType} from './settings-selection.entity';
import {
  getSelectionTypes,
  syncArtboards
} from './settings-selection.service';

export class SettingsSelectionController implements IController {
  selectionTypes = getSelectionTypes();
  @observable selectionType = SettingsSelectionType.ALL;

  constructor(
    private readonly rootController: RootController
  ) {}

  @action.bound changeSelectionType(type: SettingsSelectionType): void {
    this.selectionType = type;
  }

  apply = async (): Promise<void> => {
    const {
      boardsController: {selectedBoard}
    } = this.rootController;

    if (!selectedBoard) return;
    await syncArtboards({
      board: selectedBoard,
      selectionType: this.selectionType
    });
  };

  @action.bound reset(): void {
    this.selectionType = SettingsSelectionType.ALL;
  }
}
