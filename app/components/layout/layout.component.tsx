import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import {Icon} from 'components/icon';
import cover from './images/cover.svg';
import styles from './layout.component.sass';

type Props = WithClassName;

export const Layout: React.FC<Props> = ({
  children,
  className
}) =>
  <div className={cn(styles.container, className)}>
    <Icon
      src={cover}
      className={styles.cover}
    />
    <div className={styles.wrap}>
      {children}
    </div>
  </div>;
