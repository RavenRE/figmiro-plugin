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
      <div className={cn(styles.container, className)}>
        <input
          {...props}
          className={styles.input}
          onChange={this.onChange}
        />
      </div>
    );
  }

  private onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onChange(e.target.value);
  };
}
