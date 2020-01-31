import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './icon.component.sass';

type Props = {
  src: string;
} & WithClassName;

export const Icon: React.FC<Props> = ({src, className}) =>
  <div
    className={cn(className, styles.container)}
    dangerouslySetInnerHTML={{__html: src}}
  />;
