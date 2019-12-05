import React from 'react';
import {AuthByLoginAndPasswordComponent} from 'modules/authByLoginAndPassword';
import styles from './auth.component.sass';

export class AuthComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <h1 className={styles.title}>
          Miro Sign In
        </h1>
        <AuthByLoginAndPasswordComponent/>
      </div>
    );
  }
}
