import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './input.component.sass';

type Props =
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> &
  WithClassName & {
    onChange(value: string): void
  };
export class Input extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      className,
      ...props
    } = this.props;
    return (
      <input
        {...props}
        className={cn(className, styles.container)}
        onChange={this.onChange}
      />
    );
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(e.target.value);
  };
}
