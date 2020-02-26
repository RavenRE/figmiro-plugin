import * as React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import styles from './loader.component.sass';

export enum LoaderMode {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

type Props = {
  mode?: LoaderMode
} & WithClassName;

export const Loader: React.FC<Props> = ({mode, className}) =>
  <div
    className={
      cn(
        styles.container,
        className,
        styles[mode || LoaderMode.PRIMARY]
      )
    }
  />;
