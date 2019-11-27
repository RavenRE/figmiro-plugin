import {observable, action} from 'mobx';
import {RootController} from 'rootController';

export class AuthController {
  @observable stateValue = '';
  private readonly rootController: RootController;

  constructor(rootController: RootController) {
    this.rootController = rootController;
  }

  @action.bound changeStateValue(stateValue: string) {
    this.stateValue = stateValue;
  }
}
