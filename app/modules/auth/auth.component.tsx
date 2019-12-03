import React from 'react';
import {AuthByLoginAndPasswordComponent} from 'modules/authByLoginAndPassword';

export class AuthComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <AuthByLoginAndPasswordComponent/>
      </div>
    );
  }
}
