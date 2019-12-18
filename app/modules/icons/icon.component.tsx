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
export class Icon extends React.Component<Props | RootController> {
  render(): React.ReactNode {
    const {className, name} = this.props as Props;
    const {
      iconsController: {getIconMarkup}
    } = this.props as RootController;
    return (
      <div
        className={cn(className, styles.container)}
        dangerouslySetInnerHTML={{__html: getIconMarkup(name)}}
      />
    );
  }
}
