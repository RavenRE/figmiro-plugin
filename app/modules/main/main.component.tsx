import React from 'react';
import {connect} from 'helpers/connect';
import {AuthComponent} from 'modules/auth';
import {RootController} from 'rootController';
import {SettingsComponent} from 'modules/settings';

@connect()
export class MainComponent extends React.Component<RootController> {
  render(): React.ReactNode {
    const {
      authController: {isAuth}
    } = this.props;
    console.log(isAuth);
    return isAuth ? <SettingsComponent/> : <AuthComponent/>;
  }
}
