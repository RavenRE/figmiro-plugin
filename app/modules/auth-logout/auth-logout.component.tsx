import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {Highlighted} from 'components/highlighted';
import styles from './auth-logout.component.sass';

@connect
export class AuthLogoutComponent extends React.Component {
  render(): React.ReactNode {
    const {
      authController: {logout}
    } = this.rootController;
    return (
      <>
       <div>Logged in</div>
        <div className={styles.mention}>
          Want to use a different account? <Highlighted onClick={logout}>Log out</Highlighted>
        </div>
      </>
    );
  }

  private get rootController(): RootController {
    return this.props as RootController;
  }
}
