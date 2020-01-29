import React from 'react';
import {WithClassName} from 'utils/WithClassName';
import {Icon, IconName} from 'modules/icons';
import styles from './layout.component.sass';

type Props = WithClassName;

export const Layout: React.FC<Props> = ({
  children,
  className
}) =>
  <div className={className}>
    <Icon
      name={IconName.COVER}
      className={styles.cover}
    />
    <div className={styles.wrap}>
      {children}
    </div>
  </div>;
