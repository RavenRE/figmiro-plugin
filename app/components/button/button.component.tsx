import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './button.component.sass';

export enum ButtonMode {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

type Props =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  WithClassName & {
    mode?: ButtonMode
  };

export const Button: React.FC<Props> = ({
  children,
  className,
  mode,
  ...props
}): React.ReactElement =>
  <button
    {...props}
    className={
      cn(
        styles.container,
        className,
        styles[mode || ButtonMode.SECONDARY]
      )
    }
  >
    {children}
  </button>;
