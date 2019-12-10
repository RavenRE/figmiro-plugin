import React from 'react';
import cn from 'classnames';
import {ICONS_URL} from 'config';
import {WithClassName} from 'utils/WithClassName';
import styles from './icon.component.sass';

type Props = {
  name: string;
} & WithClassName;

export const Icon: React.FC<Props> = ({name, className}) =>
  <div
    className={cn(className, styles.container)}
    style={{backgroundImage: `url(${ICONS_URL}/${name}.svg)`}}
  />;
