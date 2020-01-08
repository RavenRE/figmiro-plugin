import React from 'react';
import cn from 'classNames';
import {WithClassName} from 'utils/WithClassName';
import styles from './progress.component.sass';

type Props = {
  done: number,
  total: number
} & WithClassName;

export const Progress: React.FC<Props> = ({className, total, done}) =>
  <div
    className={cn(styles.container, className)}
    style={{
      width: `${Math.round((done / total) * 100)}%`,
      transition: 'width .3s'
    }}
  />;
