import {observable, action} from 'mobx';
import {AuthByLoginAndPasswordDto} from './authByLoginAndPassword.dto';

export class AuthByLoginAndPasswordController {
  @observable credentials: AuthByLoginAndPasswordDto = {
    email: '',
    password: ''
  };
  @observable error = '';

  @action.bound changeEmail(email: string): void {
    this.credentials.email = email;
  }

  @action.bound changePassword(password: string): void {
    this.credentials.password = password;
  }

  @action.bound reset(): void {
    this.credentials.email = '';
    this.credentials.password = '';
    this.error = '';
  }
}
