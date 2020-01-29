import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './highlighted.component.sass';

type Props = {
  onClick?(): void;
} & WithClassName;

export const Highlighted: React.FC<Props> = ({
  children,
  className,
  onClick
}) =>
  <span
    className={cn(styles.container, className)}
    onClick={onClick}
  >
    {children}
  </span>;
