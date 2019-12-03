import React from 'react';
import styles from './auth.component.sass';
import {InputComponent} from 'components/input';

export class AuthComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <InputComponent
          placeholder="Email"
        />
        <InputComponent
          placeholder="Password"
        />
      </div>
    );
  }
}
