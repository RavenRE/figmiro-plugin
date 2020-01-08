import React from 'react';
import cn from 'classNames';
import {WithClassName} from 'utils/WithClassName';
import styles from './progress.component.sass';

type Props = {
  done: number,
  total: number
} & WithClassName;

export const Progress: React.FC<Props> = ({className, total, done}) => {
  if (!total) return null;
  return (
    <div
      className={cn(styles.container, className, {[styles['is-done']]: total === done})}
      style={{width: `${Math.round((done / total) * 100)}%`}}
    />
  );
};
