import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './radio.component.sass';

export type RadioBtn = {
  id: string;
  value: string;
};

export type OnRadioClick = (id: string) => void;

type Props = {
  radio: RadioBtn;
  active: boolean;
  onClick: OnRadioClick;
} & WithClassName;

export class Radio extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      radio: {value}
    } = this.props;
    return (
      <div
        className={this.className}
        onClick={this.onClick}
      >
        <div className={styles.icon}/>
        <div>{value}</div>
      </div>
    );
  }

  private onClick = (): void => {
    const {
      radio: {id},
      onClick
    } = this.props;
    onClick(id);
  };

  private get className(): string {
    const {className, active} = this.props;
    return cn(
      styles.container,
      className,
      {[styles['is-active']]: active}
    );
  }
}
