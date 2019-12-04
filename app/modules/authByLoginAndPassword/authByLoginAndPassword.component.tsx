import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {Input} from 'components/input';
import {Button, ButtonMode} from 'components/button';
import styles from './authByLoginAndPassword.component.sass';

@connect
export class AuthByLoginAndPasswordComponent extends React.Component {
  render(): React.ReactNode {
    const {
      changeEmail,
      changePassword,
      reset
    } = this.controller;
    return (
      <form
        className={styles.container}
        onSubmit={this.onSubmit}
      >
        {this.error && <div className={styles.error}>{this.error}</div>}
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

  private onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.controller.login();
  };

  private get error(): string | undefined {
    const {errorTypes, error} = this.controller;
    if (!error) return;
    const errorMapper = {
      [errorTypes.EMAIL_EMPTY]: 'Email field is empty',
      [errorTypes.PASSWORD_EMPTY]: 'Password field is empty',
      [errorTypes.EMAIL_IS_NOT_CORRECT]: 'Email is not correct'
    };
    return errorMapper[error];
  }

  private get controller() {
    return (this.props as RootController).authByLoginAndPasswordController;
  }
}
