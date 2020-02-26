import {observable, action} from 'mobx';
import {IController} from 'utils/Controller';
import {RootController} from 'rootController';

export class MainController implements IController {
  @observable fetching = false;
  constructor(private readonly rootController: RootController) {}

  @action.bound async initialFetch(): Promise<void> {
    try {
      this.fetching = true;
      await this.rootController.authController.checkAuth();
      await this.rootController.infoController.checkInfoShownStatus();
    } finally {
      this.fetching = false;
    }
  }

  reset(): void {
    this.fetching = false;
  }
}
