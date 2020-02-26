import {observable, action, computed} from 'mobx';
import {IController} from 'utils/Controller';
import {RootController} from 'rootController';
import {
  removeTokenFromStorage,
  createTokenInStorage,
  getTokenFromStorage,

  removeUserInfoFromStorage,
  createUserInfoInStorage,
  getUserInfoFromStorage
} from './auth.service';
import {UserInfo} from './auth.interface';

export class AuthController implements IController {
  @observable token?: string;
  @observable userInfo?: UserInfo;
  @observable checkingToken = false;

  constructor(
    private readonly rootController: RootController
  ) {}

  @action.bound async checkAuth(): Promise<void> {
    try {
      this.checkingToken = true;
      this.token = await getTokenFromStorage();
      this.userInfo = await getUserInfoFromStorage();
    } finally {
      this.checkingToken = false;
    }
  }

  @action.bound setUserInfo(userInfo: UserInfo): void {
    createUserInfoInStorage(userInfo);
    this.userInfo = userInfo;
  }

  @action.bound setToken(token: string): void {
    createTokenInStorage(token);
    this.token = token;
  }

  @action.bound logout(): void {
    removeTokenFromStorage();
    removeUserInfoFromStorage();
    Object.values(this.rootController)
      .forEach(controller => {
        controller.reset();
      });
  }

  @action.bound reset(): void {
    this.token = undefined;
    this.checkingToken = false;
  }

  @computed get isAuth(): boolean {
    return !!this.token;
  }
}
