import {observable, action, computed} from 'mobx';
import {IController} from 'utils/Controller';
import {RootController} from 'rootController';
import {
  removeTokenInStorage,
  createTokenInStorage,
  getTokenFromStorage
} from './auth.service';

export class AuthController implements IController {
  @observable token?: string;

  constructor(
    private readonly rootController: RootController
  ) {}

  @action.bound async checkToken(): Promise<void> {
    this.token = await getTokenFromStorage();
  }

  @action.bound setToken(token: string): void {
    createTokenInStorage(token);
    this.token = token;
  }

  @action.bound logout(): void {
    removeTokenInStorage();
    Object.values(this.rootController)
      .forEach(controller => {
        controller.reset();
      });
  }

  @action.bound reset(): void {
    this.token = undefined;
  }

  @computed get isAuth(): boolean {
    return !!this.token;
  }
}
