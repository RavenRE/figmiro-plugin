import {AppMenuItem} from './menu.entity';

export function getAppMenuItems(): AppMenuItem[] {
  return Object.values(AppMenuItem);
}
