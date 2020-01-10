import {observable, action} from 'mobx';
import {IController} from 'utils/Controller';
import {IconName, IconMarkupByName, IconMarkup} from './icon.entity';
import {getIcons, getIconNames} from './icons.service';

export class IconsController implements IController {
  @observable icons: IconMarkupByName = {};
  @observable fetching = false;

  getIconMarkup = (iconName: IconName): IconMarkup => this.icons[iconName];

  @action.bound async fetchIcons(): Promise<void> {
    try {
      this.fetching = true;
      const iconNames = getIconNames();
      this.icons = await getIcons(iconNames);
    } finally {
      this.fetching = false;
    }
  }

  @action.bound reset(): void {
    this.fetching = false;
  }
}
