import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './dropdown-item.component.sass';

export type DDItem = {
  id: string;
  value: string;
};

export type OnDDItemClick = (id: string) => void;

type Props = {
  item: DDItem;
  active: boolean;
  onClick: OnDDItemClick;
} & WithClassName;

export class DropdownItem extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      active,
      item: {value},
      className
    } = this.props;
    return (
      <div
        className={
          cn(
            className,
            styles.container,
            {[styles['is-active']]: active}
          )
        }
        onClick={this.onClick}
      >
        {value}
      </div>
    );
  }

  private onClick = (): void => {
    const {
      item: {id},
      onClick
    } = this.props;
    onClick(id);
  };
}
