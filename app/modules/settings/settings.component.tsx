import React from 'react';
import {connect} from 'utils/connect';
import {BoardsComponent} from 'modules/boards';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';
import {InjectedProps, RootController} from 'rootController';

@connect(ROOT_CONTROLLER_KEY)
export class SettingsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      settingsController: {syncAll}
    } = this.rootController;
    return (
      <div>
        Settings
        <BoardsComponent/>
        <button onClick={syncAll}>Sync</button>
      </div>
    );
  }

  private get rootController(): RootController {
    return (this.props as InjectedProps)[ROOT_CONTROLLER_KEY];
  }
}
