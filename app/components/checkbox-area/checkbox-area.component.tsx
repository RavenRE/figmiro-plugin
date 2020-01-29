import React from 'react';
import {WithClassName} from 'utils/WithClassName';
import {CheckboxBtn, OnCheckboxClick, Checkbox} from './checkbox';
import styles from './checkbox-area.component.sass';

export {CheckboxBtn, OnCheckboxClick} from './checkbox';
export type CheckboxItems = CheckboxBtn[];

type Props = {
  items: CheckboxItems;
  selected: CheckboxItems;
  onItemClick: OnCheckboxClick;
} & WithClassName;

export const CheckboxArea: React.FC<Props> = ({
  items,
  className,
  selected,
  onItemClick
}) =>
  <div className={className}>
    {items.map(item =>
      <Checkbox
        checkbox={item}
        active={selected.some(i => i.id === item.id)}
        onClick={onItemClick}
        className={styles.radio}
        key={item.id}
      />
    )}
  </div>;
