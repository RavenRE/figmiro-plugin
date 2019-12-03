import {observable, action} from 'mobx';

export class AuthController {
  @observable error?: string;
}
