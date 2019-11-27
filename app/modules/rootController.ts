import {AuthController} from 'modules/auth';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';

export class RootController {
  authController: AuthController;

  constructor() {
    this.authController = new AuthController(this);
  }
}

export const rootController = new RootController();
export type InjectedProps = {
  [ROOT_CONTROLLER_KEY]: RootController;
};
