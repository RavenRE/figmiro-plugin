import * as React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './loader.component.sass';

export const Loader: React.FC<WithClassName> = ({className}) =>
  <div className={cn(styles.container, className)}>
    <div/>
    <div/>
    <div/>
    <div/>
  </div>;
