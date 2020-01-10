import React from 'react';
import {connect} from 'helpers/connect';
import {AuthComponent} from 'modules/auth';
import {RootController} from 'rootController';
import {SettingsComponent} from 'modules/settings';
import {Loader} from 'components/Loader';
import styles from './main.component.sass';

@connect
export class MainComponent extends React.Component {
  render(): React.ReactNode {
    const {
      authController: {
        isAuth,
        checkingToken
      },
      iconsController: {fetching: fetchingIcons}
    } = this.rootController;
    const isFetching = checkingToken || fetchingIcons;
    return (
      <div className={styles.container}>
        {isFetching ?
          <Loader/> :
        isAuth ?
          <SettingsComponent/> :
          <AuthComponent/>
        }
      </div>
    );
  }

  async componentDidMount() {
    await Promise.all([
      this.rootController.authController.checkToken(),
      this.rootController.iconsController.fetchIcons()
    ]);
  }

  private get rootController(): RootController {
    return this.props as RootController;
  }
}
