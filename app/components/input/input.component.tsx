import React from 'react';
import cn from 'classnames';
import styles from './input.component.sass';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export const InputComponent: React.FC<Props> = props =>
  <div className={cn(styles.container, props.className)}>
    <input
      {...props}
      className={styles.input}
    />
  </div>;
