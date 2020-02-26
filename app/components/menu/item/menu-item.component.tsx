import React, {useCallback} from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './menu-item.component.sass';

export type MenuItem = {
  id: string;
  label: string;
  isDisabled: boolean;
};

export type OnMenuItemClick = (id: string) => void;

type Props = {
  item: MenuItem;
  isActive: boolean;
  onClick: OnMenuItemClick;
} & WithClassName;

export const MenuItemComponent: React.FC<Props> = ({
  item: {label, id, isDisabled},
  onClick,
  isActive,
  className
}) => {
  const onItemClick = useCallback(() => {
    onClick(id);
  }, []);
  return (
    <div
      onClick={isDisabled ? undefined : onItemClick}
      className={cn(styles.container, className, {
        [styles['is-active']]: isActive,
        [styles['is-disabled']]: isDisabled
      })}
    >
      {label}
    </div>
  );
};
