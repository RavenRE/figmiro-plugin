import {observable, action} from 'mobx';
import {RootController} from 'rootController';
import {getStateValue} from './auth.service';

export class AuthController {
  @observable stateValue = '';
  @observable error = '';
  private readonly rootController: RootController;

  constructor(rootController: RootController) {
    this.rootController = rootController;
  }

  @action.bound async fetchStateValue(): Promise<void> {
    try {
      this.stateValue = await getStateValue();
    } catch (error) {
      this.error = '';
    }
  }
}
