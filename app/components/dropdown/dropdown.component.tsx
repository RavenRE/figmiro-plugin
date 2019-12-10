import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import {DDItem, OnDDItemClick, DropdownItem} from './dropdown-item';
import styles from './dropdown.component.sass';

export {DDItem, OnDDItemClick} from './dropdown-item';
export type DDItems = DDItem[];

type Props = {
  items: DDItems;
  selected: DDItem;
  onItemClick: OnDDItemClick;
} & WithClassName;

export class Dropdown extends React.Component<Props> {
  render(): React.ReactNode {
    const {items, selected, className, onItemClick} = this.props;

    if (this.isZeroItems) {
      return (
        <div>
          Zero
        </div>
      );
    }

    if (this.isOneItem) {
      return (
        <div>
          {items[0].value}
        </div>
      );
    }

    return (
      <div className={cn(className)}>
        <div className={styles.selected}>
          {selected.value}
        </div>
        <div className={styles.items}>
        {items.map(item =>
          <DropdownItem
            key={item.id}
            item={item}
            onClick={onItemClick}
          />
        )}
        </div>
      </div>
    );
  }

  private get isOneItem(): boolean {
    return this.props.items.length === 1;
  }

  private get isZeroItems(): boolean {
    return !this.props.items.length;
  }
}
