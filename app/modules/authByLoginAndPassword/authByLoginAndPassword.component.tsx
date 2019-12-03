import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {Input} from 'components/input';
import {Button, ButtonMode} from 'components/button';
import styles from './authByLoginAndPassword.component.sass';

@connect()
export class AuthByLoginAndPasswordComponent extends React.Component {
  render(): React.ReactNode {
    const {
      authByLoginAndPasswordController: {
        changeEmail,
        changePassword,
        reset
      }
    } = this.props as RootController;
    return (
      <form className={styles.container}>
        <Input
          placeholder="Email"
          onChange={changeEmail}
          className={styles.input}
        />
        <Input
          placeholder="Password"
          onChange={changePassword}
          className={styles.input}
        />
        <div className={styles.controls}>
          <Button
            type="reset"
            className={styles.btn}
            onClick={reset}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={styles.btn}
            mode={ButtonMode.PRIMARY}
          >
            Sign In
          </Button>
        </div>
      </form>
    );
  }
}
