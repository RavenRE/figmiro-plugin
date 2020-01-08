import {action, observable} from 'mobx';
import {IController} from 'utils/Controller';
import {SettingsSelectionType} from './settings-selection.entity';
import {getSelectionTypes} from './settings-selection.service';

export class SettingsSelectionController implements IController {
  selectionTypes = getSelectionTypes();
  @observable selectionType = SettingsSelectionType.ALL;

  @action.bound changeSelectionType(type: SettingsSelectionType): void {
    this.selectionType = type;
  }

  @action.bound reset(): void {
    this.selectionType = SettingsSelectionType.ALL;
  }
}
