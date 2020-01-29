import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './link.component.sass';

type Props = {
  href: string;
} & WithClassName;

export const Link: React.FC<Props> = ({href, className}) =>
  <a
    className={cn(styles.container, className)}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {href}
  </a>;
