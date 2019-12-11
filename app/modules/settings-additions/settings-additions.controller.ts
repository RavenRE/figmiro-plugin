import {action, observable} from 'mobx';
import {IController} from 'utils/Controller';
import {SettingsAdditionsType} from './settings-additions.entity';
import {getAdditionsSettingsTypes} from './settings-additions.service';

export class SettingsAdditionsController implements IController {
  additionsSettings = getAdditionsSettingsTypes();
  @observable selected: SettingsAdditionsType[] = [];

  @action.bound updateAdditions(type: SettingsAdditionsType): void {
    const alreadyHas = this.selected.includes(type);
    if (alreadyHas) {
      this.selected = this.selected.filter(t => t !== type);
      return;
    }
    this.selected = [...this.selected, type];
  }

  @action.bound reset(): void {
    this.selected = [];
  }
}
