import {observable, action} from 'mobx';
import {isEmail} from 'utils/isEmail';
import {AppError} from 'utils/AppError';
import {AuthByLoginAndPasswordDto} from './authByLoginAndPassword.dto';

enum ErrorType {
  EMAIL_EMPTY = 'EMAIL_EMPTY',
  PASSWORD_EMPTY = 'PASSWORD_EMPTY',
  EMAIL_IS_NOT_CORRECT = 'EMAIL_IS_NOT_CORRECT'
}
export class AuthByLoginAndPasswordController {
  @observable credentials: AuthByLoginAndPasswordDto = {
    email: '',
    password: ''
  };
  @observable error?: ErrorType;
  errorTypes = ErrorType;

  @action.bound login(): void {
    try {
      this.validate();
    } catch (error) {
      this.error = error.status;
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
