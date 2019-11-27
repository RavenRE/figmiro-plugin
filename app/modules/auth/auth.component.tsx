import React from 'react';
import {connect} from 'utils/connect';
import {InjectedProps, RootController} from 'rootController';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';
import {API_URL, MIRO_APP_CLIENT_ID} from 'services/api-config';

@connect(ROOT_CONTROLLER_KEY)
export class AuthComponent extends React.Component {
  render(): React.ReactNode {
    if (!this.link) return null;
    return (
      <div>
        <a
          target="_blank"
          href={this.link}
        >
          Install App
        </a>
      </div>
    );
  }

  private get link(): string | undefined {
    const {
      authController: {stateValue}
    } = this.rootController;
    if (!stateValue) return;
    return `https://miro.com/oauth/authorize?state=${stateValue
      }&response_type=code&client_id=${MIRO_APP_CLIENT_ID}&redirect_uri=${API_URL}/oauth`;
  }

  private get rootController(): RootController {
    return (this.props as InjectedProps)[ROOT_CONTROLLER_KEY];
  }
}
