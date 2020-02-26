import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import {Icon} from 'components/icon';
import {MenuComponent, MenuItems, OnMenuItemClick} from 'components/menu';
import cover from './images/cover.svg';
import styles from './layout.component.sass';

export {MenuItems} from 'components/menu';

type Props = {
  menuItems: MenuItems;
  currentMenuItemId: string;
  onMenuItemClick: OnMenuItemClick;
} & WithClassName;

export const Layout: React.FC<Props> = ({
  menuItems,
  onMenuItemClick,
  currentMenuItemId,
  children,
  className
}) =>
  <div className={cn(styles.container, className)}>
    <Icon
      src={cover}
      className={styles.cover}
    />
    <MenuComponent
      items={menuItems}
      currentItemId={currentMenuItemId}
      onMenuItemClick={onMenuItemClick}
      className={styles.menu}
    />
    <div className={styles.wrap}>
      {children}
    </div>
  </div>;
