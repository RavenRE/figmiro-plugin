import {action, observable} from 'mobx';
import {RootController} from 'rootController';
import {IController} from 'utils/Controller';
import {SettingsAdditionsType} from './settings-additions.entity';
import {
  getAdditionsSettingsTypes,
  createBoardLink
} from './settings-additions.service';

export class SettingsAdditionsController implements IController {
  additionsSettings = getAdditionsSettingsTypes();
  @observable selected: SettingsAdditionsType[] = [];

  constructor(
    private readonly rootController: RootController
  ) {}

  @action.bound updateAdditions(type: SettingsAdditionsType): void {
    const alreadyHas = this.selected.includes(type);
    if (alreadyHas) {
      this.selected = this.selected.filter(t => t !== type);
      return;
    }
    this.selected = [...this.selected, type];
  }

  apply = (): void => {
    if (this.selected.includes(SettingsAdditionsType.OPEN_MIRO)) {
      this.openBoardLink();
    }
  };

  private openBoardLink = (): void => {
    const {
      boardsController: {selectedBoard}
    } = this.rootController;
    if (!selectedBoard) return;
    const link = createBoardLink(selectedBoard);
    window.open(link, '_blank');
  };

  @action.bound reset(): void {
    this.selected = [];
  }
}
