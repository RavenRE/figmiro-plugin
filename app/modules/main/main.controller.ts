import {observable, action} from 'mobx';
import {IController} from 'utils/Controller';
import {RootController} from 'rootController';

export class MainController implements IController {
  @observable fetching = false;
  constructor(private readonly rootController: RootController) {}

  @action.bound async initialFetch(): Promise<void> {
    try {
      this.fetching = true;
      await this.rootController.authController.checkToken();
    } finally {
      this.fetching = false;
    }
  }

  reset(): void {
    this.fetching = false;
  }
}
