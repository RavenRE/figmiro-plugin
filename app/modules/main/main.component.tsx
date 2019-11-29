import React from 'react';
import {connect} from 'utils/connect';
import {InjectedProps, RootController} from 'rootController';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';
import {AuthComponent} from 'modules/auth';
import {SettingsComponent} from 'modules/settings';

@connect(ROOT_CONTROLLER_KEY)
export class MainComponent extends React.Component {
  render(): React.ReactNode {
    // const {
    //   authController: {isAuth}
    // } = this.rootController;
    // return isAuth ? <SettingsComponent/> : <AuthComponent/>;
    return <SettingsComponent/>;
  }

  private get rootController(): RootController {
    return (this.props as InjectedProps)[ROOT_CONTROLLER_KEY];
  }
}
