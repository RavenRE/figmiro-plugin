import React, {useEffect} from 'react';
import cn from 'classNames';
import {WithClassName} from 'utils/WithClassName';
import styles from './progress.component.sass';

type Props = {
  done: number;
  total: number;
  error?: string;
  label?: string;
  doneLabel?: string;
  reset(): void;
} & WithClassName;

export const Progress: React.FC<Props> = ({
  total,
  done,
  error,
  label,
  doneLabel,
  className,
  reset
}) => {
  const isContentHidden = !total || !done;
  const isDone = total === done;
  useEffect(
    () => { if (isDone) setTimeout(reset, 4000); },
    [isDone]
  );
  return (
    <div
      className={
        cn(
          styles.container, className, {
            [styles['is-done']]: isDone,
            [styles['is-error']]: !!error
          }
        )
      }
    >
      {!isContentHidden &&
        <div
          className={styles.progress}
          style={{width: `${Math.round((done / total) * 100)}%`}}
        />
      }
      {!!error &&
        <div className={styles.error}>{error}</div>
      }
      {isDone && doneLabel && !label && !error && !isContentHidden &&
        <div className={styles.label}>{doneLabel}</div>
      }
      {!isDone && label && !error && !isContentHidden &&
        <div className={styles.label}>{label}</div>
      }
    </div>
  );
};
