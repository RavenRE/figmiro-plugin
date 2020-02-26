import React from 'react';
import {connect} from 'helpers/connect';
import {resize} from 'helpers/resize';
import {RootController} from 'rootController';
import {Highlighted} from 'components/highlighted';
import styles from './auth-logout.component.sass';

@connect
export class AuthLogoutComponent extends React.Component {
  render(): React.ReactNode {
    const {
      authController: {logout, userInfo}
    } = this.rootController;
    return (
      <>
        <div className={styles.title}>Logged in</div>
        <div className={styles.info}>{userInfo && userInfo.email}</div>
        <div>
          Want to use a different account? <Highlighted onClick={logout}> Log out</Highlighted>
        </div>
      </>
    );
  }

  componentDidMount(): void {
    resize({height: 204});
  }

  private get rootController(): RootController {
    return this.props as RootController;
  }
}
