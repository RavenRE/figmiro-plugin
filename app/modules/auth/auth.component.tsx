import React from 'react';
import {Input} from 'components/input';
import {Button, ButtonMode} from 'components/button';
import styles from './auth.component.sass';

export class AuthComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <form className={styles.container}>
        <Input
          placeholder="Email"
          className={styles.input}
        />
        <Input
          placeholder="Password"
          className={styles.input}
        />
        <div className={styles.controls}>
          <Button
            type="reset"
            className={styles.btn}
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
