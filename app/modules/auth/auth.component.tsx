import React from 'react';
import {connect} from 'utils/connect';
import {InjectedProps, RootController} from 'rootController';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';

@connect()
export class AuthComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        Anuatorized
      </div>
    );
  }

  private get rootController(): RootController {
    return (this.props as InjectedProps)[ROOT_CONTROLLER_KEY];
  }
}
