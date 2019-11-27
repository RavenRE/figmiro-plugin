import {observable, action} from 'mobx';
import {RootController} from 'rootController';
import {getStateValue, checkIsAuth} from './auth.service';

export class AuthController {
  @observable stateValue = '';
  @observable error = '';
  @observable isAuth = false;
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

  @action.bound async fetchCheckAuth(): Promise<void> {
    try {
      this.isAuth = await checkIsAuth(this.stateValue);
    } catch (error) {
      this.error = '';
    }
  }
}
