import React from 'react';
import {connect} from 'helpers/connect';
import {InjectedProps, RootController} from 'rootController';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';

export class AuthComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        Anuatorized
      </div>
    );
  }
}
