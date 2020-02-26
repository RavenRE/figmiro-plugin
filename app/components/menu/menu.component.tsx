import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import {MenuItemComponent, MenuItem, OnMenuItemClick} from './item';
import styles from './menu.component.sass';

export type MenuItems = MenuItem[];
export {OnMenuItemClick} from './item';

type Props = {
  items: MenuItems;
  onMenuItemClick: OnMenuItemClick;
  currentItemId: string;
} & WithClassName;

export class MenuComponent extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      items,
      className,
      currentItemId,
      onMenuItemClick
    } = this.props;
    return (
      <div className={cn(styles.container, className)}>
        <div className={styles.wrap}>
          {items.map(item =>
            <MenuItemComponent
              key={item.id}
              item={item}
              className={styles.item}
              isActive={item.id === currentItemId}
              onClick={onMenuItemClick}
            />
          )}
        </div>
        <a
          className={styles.copyright}
          href="https://redmadrobot.com"
          target="_blank"
        >
          by Redmadrobot
        </a>
      </div>
    );
  }
}
