import {observable, action} from 'mobx';
import {IController} from 'utils/Controller';
import {isEmail} from 'utils/isEmail';
import {AppError} from 'utils/AppError';
import {RootController} from 'rootController';
import {AuthByLoginAndPasswordDto} from './authByLoginAndPassword.dto';
import {authByLoginAndPassword} from './authByLoginAndPassword.service';

enum ErrorType {
  EMAIL_EMPTY = 'EMAIL_EMPTY',
  PASSWORD_EMPTY = 'PASSWORD_EMPTY',
  EMAIL_IS_NOT_CORRECT = 'EMAIL_IS_NOT_CORRECT',
  AUTHORIZATION_FAILED = 'authorizationFailed',
  SERVER_ERROR = 'Server Error',
  NETWORK_ERROR = 'NETWORK_ERROR'
}
export class AuthByLoginAndPasswordController implements IController {
  @observable credentials: AuthByLoginAndPasswordDto = {
    email: '',
    password: ''
  };
  @observable error?: ErrorType;
  errorTypes = ErrorType;

  constructor(
    private readonly rootController: RootController
  ) {}

  @action.bound async login(): Promise<void> {
    try {
      this.validate();
      const token = await authByLoginAndPassword(this.credentials);
      this.rootController.authController.setToken(token);
      this.reset();
    } catch (error) {
      if (error.status) {
        this.error = error.status;
        return;
      }
      this.error = ErrorType.NETWORK_ERROR;
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

  private validate(): void | never {
    const isEmailEmpty = !this.credentials.email;
    if (isEmailEmpty) throw new AppError(ErrorType.EMAIL_EMPTY);

    const isPasswordEmpty = !this.credentials.password;
    if (isPasswordEmpty) throw new AppError(ErrorType.PASSWORD_EMPTY);

    const isWrongEmail = !isEmail(this.credentials.email);
    if (isWrongEmail) throw new AppError(ErrorType.EMAIL_IS_NOT_CORRECT);
  }

  @action.bound private resetErrors(): void {
    this.error = undefined;
  }
}
