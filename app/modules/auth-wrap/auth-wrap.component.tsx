import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {AuthComponent} from 'modules/auth';
import {AuthLogoutComponent} from 'modules/auth-logout';

@connect
export class AuthWrapComponent extends React.Component {
  render(): React.ReactNode {
    const {
      authController: {isAuth}
    } = this.rootController;
    return isAuth ? <AuthLogoutComponent/> : <AuthComponent/>;
  }

  private get rootController(): RootController {
    return this.props as RootController;
  }
}
