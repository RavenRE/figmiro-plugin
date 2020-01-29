import {observable, action, computed} from 'mobx';
import {IController} from 'utils/Controller';
import {isEmail} from 'utils/isEmail';
import {AppError} from 'helpers/AppError';
import {RootController} from 'rootController';
import {AuthByLoginAndPasswordErrorType} from './auth-by-login-and-password.errors';
import {AuthByLoginAndPasswordDto} from './auth-by-login-and-password.dto';
import {authByLoginAndPassword} from './auth-by-login-and-password.service';

export class AuthByLoginAndPasswordController implements IController {
  @observable credentials: AuthByLoginAndPasswordDto = {
    email: '',
    password: ''
  };
  @observable fetching = false;
  @observable error?: AuthByLoginAndPasswordErrorType;
  @observable isEmailError = false;

  constructor(
    private readonly rootController: RootController
  ) {}

  @action.bound async login(): Promise<void> {
    try {
      if (this.fetching) return;
      this.validate();
      this.fetching = true;
      const token = await authByLoginAndPassword(this.credentials);
      this.rootController.authController.setToken(token);
      this.reset();
    } catch (error) {
      this.error = error.status;
    } finally {
      this.fetching = false;
    }
  }

  @action.bound changeEmail(email: string): void {
    this.resetErrors();
    this.credentials.email = email;
  }

  @action.bound changePassword(password: string): void {
    this.resetErrors();
    this.credentials.password = password;
  }

  @action.bound reset(): void {
    this.credentials.email = '';
    this.credentials.password = '';
    this.resetErrors();
  }

  @action.bound validate(): void | never {
    const isWrongEmail = !isEmail(this.credentials.email);
    if (isWrongEmail) {
      this.isEmailError = true;
      throw new AppError(AuthByLoginAndPasswordErrorType.EMAIL_IS_NOT_CORRECT);
    }
  }

  @action.bound private resetErrors(): void {
    this.isEmailError = false;
    this.error = undefined;
    this.fetching = false;
  }

  @computed get isLoginDisabled(): boolean {
    return (
      !!this.error ||
      !this.credentials.email ||
      !this.credentials.password
    );
  }
}
