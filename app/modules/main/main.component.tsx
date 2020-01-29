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
      authController: {isAuth},
      mainController: {fetching}
    } = this.rootController;
    return (
      <div className={styles.container}>
        {fetching ?
          <Loader/> :
        isAuth ?
          <SettingsComponent/> :
          <AuthComponent/>
        }
      </div>
    );
  }

  async componentDidMount() {
    await this.rootController.mainController.initialFetch();
  }

  private get rootController(): RootController {
    return this.props as RootController;
  }
}
