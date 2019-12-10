import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import {DDItem, OnDDItemClick, DropdownItem} from './dropdown-item';

export type DDItems = DDItem[];

type Props = {
  items: DDItems;
  onItemClick: OnDDItemClick;
} & WithClassName;

export class Dropdown extends React.Component<Props> {
  render(): React.ReactNode {
    const {items, className, onItemClick} = this.props;
    return (
      <div className={cn(className)}>
        {items.map(item =>
          <DropdownItem
            key={item.id}
            item={item}
            onClick={onItemClick}
          />
        )}
      </div>
    );
  }
}
