import React from 'react';
import cn from 'classNames';
import {WithClassName} from 'utils/WithClassName';
import styles from './progress.component.sass';

type Props = {
  done: number,
  total: number,
  label?: string,
  doneLabel?: string
} & WithClassName;

export const Progress: React.FC<Props> = ({
  total,
  done,
  label,
  doneLabel,
  className
}) => {
  if (!total) return null;
  const isDone = total === done;
  return (
    <div className={cn(styles.container, className, {[styles['is-done']]: isDone})}>
      <div
        className={styles.progress}
        style={{width: `${Math.round((done / total) * 100)}%`}}
      />
      {isDone && doneLabel && !label && <div className={styles.label}>{doneLabel}</div>}
      {!isDone && label && <div className={styles.label}>{label}</div>}
    </div>
  );
};
