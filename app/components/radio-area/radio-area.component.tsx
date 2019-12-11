import React from 'react';
import {WithClassName} from 'utils/WithClassName';
import {RadioBtn, OnRadioClick, Radio} from './radio';
import styles from './radio-area.component.sass';

export {RadioBtn, OnRadioClick} from './radio';
export type RadioItems = RadioBtn[];

type Props = {
  items: RadioItems;
  selected: RadioBtn;
  onItemClick: OnRadioClick;
} & WithClassName;

export const RadioArea: React.FC<Props> = ({
  items,
  className,
  selected,
  onItemClick
}) =>
  <div className={className}>
    {items.map(item =>
      <Radio
        radio={item}
        active={selected.id === item.id}
        onClick={onItemClick}
        className={styles.radio}
        key={item.id}
      />
    )}
  </div>;
