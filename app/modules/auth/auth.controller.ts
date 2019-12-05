import {observable, action, computed} from 'mobx';
import {RootController} from 'rootController';
import {
  createTokenInStorage,
  getTokenFromStorage
} from './auth.service';

export class AuthController {
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

  @action.bound async logout(): Promise<void> {
    this.reset();
    this.rootController.authByLoginAndPasswordController.reset();
  }

  @action.bound reset(): void {
    this.token = undefined;
  }

  @computed get isAuth(): boolean {
    return !!this.token;
  }
}
