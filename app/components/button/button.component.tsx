import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import {Loader, LoaderMode} from 'components/loader';
import styles from './button.component.sass';

export enum ButtonMode {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

type Props =
  React.ButtonHTMLAttributes<HTMLButtonElement> &
  WithClassName & {
    mode?: ButtonMode,
    fetching?: boolean;
  };

export class Button extends React.Component<Props> {
  render(): React.ReactNode {
    const {
      children,
      className,
      fetching,
      ...props
    } = this.props;
    return (
      <button
        {...props}
        className={
          cn(
            styles.container,
            className,
            styles[this.mode],
            {[styles['is-fetching']]: fetching}
          )
        }
      >
        <Loader
          className={styles.loader}
          mode={this.loaderMode}
        />
        <div className={styles.children}>{children}</div>
      </button>
    );
  }

  private get mode(): ButtonMode {
    return this.props.mode || ButtonMode.SECONDARY;
  }

  private get loaderMode(): LoaderMode {
    const mapper = {
      [ButtonMode.PRIMARY]: LoaderMode.SECONDARY,
      [ButtonMode.SECONDARY]: LoaderMode.PRIMARY
    };
    return mapper[this.mode];
  }
}
