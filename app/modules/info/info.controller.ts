import {action, observable} from 'mobx';
import {IController} from 'utils/Controller';
import {getInfoShownStatus, setInfoShownStatus} from './info.service';

export class InfoController implements IController {
  @observable isInfoShown = true;

  @action.bound async checkInfoShownStatus(): Promise<void> {
    this.isInfoShown = !!(await getInfoShownStatus());
  }

  @action.bound setInfoShownStatus(): void {
    setInfoShownStatus();
    this.isInfoShown = true;
  }

  @action.bound reset(): void {
    this.isInfoShown = true;
  }
}
