import React from 'react';
import styles from './input.component.sass';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const InputComponent: React.FC<Props> = props =>
  <div className={styles.container}>
    <input
      {...props}
      className={styles.input}
    />
  </div>;
