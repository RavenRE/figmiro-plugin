import React from 'react';
import styles from './auth.component.sass';
import {InputComponent} from 'components/input';

export class AuthComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <InputComponent
          placeholder="Email"
          className={styles.input}
        />
        <InputComponent
          placeholder="Password"
          className={styles.input}
        />
      </div>
    );
  }
}
