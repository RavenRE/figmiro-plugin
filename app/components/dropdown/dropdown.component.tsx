import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import {Icon} from 'components/icon';
import {DDItem, OnDDItemClick, DropdownItem} from './dropdown-item';
import styles from './dropdown.component.sass';

export {DDItem, OnDDItemClick} from './dropdown-item';
export type DDItems = DDItem[];

type Props = {
  items: DDItems;
  selected: DDItem;
  onItemClick: OnDDItemClick;
} & WithClassName;

type State = {
  isOpen: boolean
};

export class Dropdown extends React.Component<Props, State> {
  state = {
    isOpen: false
  };
  wrapperRef?: HTMLElement;

  render(): React.ReactNode {
    const {items, selected, className} = this.props;
    return (
      <div
        className={
          cn(
            className,
            styles.container,
            {[styles['is-open']]: this.state.isOpen}
          )
        }
        ref={this.setWrapperRef}
      >
        <div
          onClick={this.toggle}
          className={styles.selected}
        >
          <div>
            {selected.value}
          </div>
          <Icon
            className={styles['selected-arrow']}
            name="arrow"
          />
        </div>
        <div className={styles.items}>
        {items.map(item =>
          <DropdownItem
            key={item.id}
            item={item}
            onClick={this.onItemClick}
            className={styles.item}
            active={selected.id === item.id}
          />
        )}
        </div>
      </div>
    );
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private onItemClick = (id: string): void => {
    this.props.onItemClick(id);
    this.close();
  };

  private setWrapperRef = (node: HTMLDivElement): void => {
    this.wrapperRef = node;
  };

  private handleClickOutside = (event: MouseEvent): void => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.contains(event.target as Node) &&
      this.state.isOpen
    ) {
      this.close();
    }
  };

  private toggle = (): void => {
    if (this.state.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  private open = (): void => {
    this.setState({isOpen: true});
  };

  private close = (): void => {
    this.setState({isOpen: false});
  };
}
