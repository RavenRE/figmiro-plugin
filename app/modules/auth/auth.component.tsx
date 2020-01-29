import React from 'react';
import {Layout} from 'components/layout';
import {AuthByLoginAndPasswordComponent} from 'modules/auth-by-login-and-password';
import styles from './auth.component.sass';

export const AuthComponent: React.FC = () =>
  <Layout>
    <h1 className={styles.title}>
      Log into Miro
    </h1>
    <AuthByLoginAndPasswordComponent/>
  </Layout>;
