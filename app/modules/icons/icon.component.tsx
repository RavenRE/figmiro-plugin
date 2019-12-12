import React from 'react';
import cn from 'classnames';
import {WithClassName} from 'utils/WithClassName';
import {RootController} from 'rootController';
import {connect} from 'helpers/connect';
import {IconName} from './icon.entity';
import styles from './icon.component.sass';

type Props = {
  name: IconName;
} & WithClassName;

@connect
export class Icon extends React.Component<Props> {
  render(): React.ReactNode {
    const {className, name} = this.props;
    const {
      iconsController: {getIconMarkup}
    } = this.rootController;
    return (
      <div
        className={cn(className, styles.container)}
        dangerouslySetInnerHTML={{__html: getIconMarkup(name)}}
      />
    );
  }

  private get rootController(): RootController {
    return (this.props as RootController);
  }
}
