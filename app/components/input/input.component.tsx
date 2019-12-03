import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './input.component.sass';

type Props = React.InputHTMLAttributes<HTMLInputElement> & WithClassName;
export const Input: React.FC<Props> = ({
  className,
  ...props
}): React.ReactElement =>
  <div className={cn(styles.container, className)}>
    <input
      {...props}
      className={styles.input}
    />
  </div>;
