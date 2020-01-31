import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import {Icon} from 'components/icon';
import checkedIcon from './images/checked.svg';
import uncheckedIcon from './images/unchecked.svg';
import styles from './checkbox.component.sass';

export type CheckboxBtn = {
  id: string;
  value: string;
};

export type OnCheckboxClick = (id: string) => void;

type Props = {
  checkbox: CheckboxBtn;
  active: boolean;
  onClick: OnCheckboxClick;
} & WithClassName;

export class Checkbox extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      checkbox: {value}
    } = this.props;
    return (
      <div
        className={this.className}
        onClick={this.onClick}
      >
        <Icon
          src={this.iconSrc}
          className={styles.icon}
        />
        <div>{value}</div>
      </div>
    );
  }

  private onClick = (): void => {
    const {
      checkbox: {id},
      onClick
    } = this.props;
    onClick(id);
  };

  private get iconSrc(): string {
    return this.props.active ? checkedIcon : uncheckedIcon;
  }

  private get className(): string {
    return cn(styles.container, this.props.className);
  }
}
