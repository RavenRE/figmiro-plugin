import React from 'react';
import {AuthByLoginAndPasswordComponent} from 'modules/auth-by-login-and-password';
import styles from './auth.component.sass';

export const AuthComponent: React.FC = () =>
  <>
    <h1 className={styles.title}>
      Log into Miro
    </h1>
    <AuthByLoginAndPasswordComponent/>
  </>;
