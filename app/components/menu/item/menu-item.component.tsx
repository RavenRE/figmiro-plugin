import React, {useCallback} from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './menu-item.component.sass';

export type MenuItem = {
  id: string;
  label: string;
};

export type OnMenuItemClick = (id: string) => void;

type Props = {
  item: MenuItem;
  isActive: boolean;
  onClick: OnMenuItemClick;
} & WithClassName;

export const MenuItemComponent: React.FC<Props> = ({
  item: {label, id},
  onClick,
  isActive,
  className
}) => {
  const onItemClick = useCallback(() => {
    onClick(id);
  }, []);
  return (
    <div
      onClick={onItemClick}
      className={cn(styles.container, className, {[styles['is-active']]: isActive})}
    >
      {label}
    </div>
  );
};
