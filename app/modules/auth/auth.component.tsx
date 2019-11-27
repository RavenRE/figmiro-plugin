import React from 'react';
import {connect} from 'utils/connect';
import {InjectedProps, RootController} from 'rootController';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';
import {API_URL, MIRO_APP_CLIENT_ID} from 'services/api-config';

@connect(ROOT_CONTROLLER_KEY)
export class AuthComponent extends React.Component {
  private intervalId?: number;

  render(): React.ReactNode {
    if (!this.link) return null;
    return (
      <div>
        <a target="_blank" href={this.link}>
          Install App
        </a>
      </div>
    );
  }

  componentDidMount() {
    this.intervalId = window.setInterval(this.checkOnInterval, 2000);
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  private checkOnInterval = async (): Promise<void> => {
    await this.rootController.authController.fetchCheckAuth();
  };

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
