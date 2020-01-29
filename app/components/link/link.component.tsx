import React from 'react';
import {WithClassName} from 'utils/WithClassName';
import {Highlighted} from 'components/highlighted';
import styles from './link.component.sass';

type Props = {
  href: string;
} & WithClassName;

export const Link: React.FC<Props> = ({href, className}) =>
  <Highlighted className={className}>
    <a
      className={styles.link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {href}
    </a>
  </Highlighted>;
