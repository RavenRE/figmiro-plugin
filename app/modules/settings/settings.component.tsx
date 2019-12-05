import React from 'react';
import {connect} from 'helpers/connect';
import {Button} from 'components/button';
import {RootController} from 'rootController';
import {BoardsComponent} from 'modules/boards';

@connect
export class SettingsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      settingsController: {
        changeSyncType,
        sync
      },
      authController: {
        logout
      }
    } = this.rootController;
    return (
      <div>
        Settings
        <Button onClick={logout}>
          Logout
        </Button>
        <BoardsComponent/>
        <select
          onChange={(event) => {changeSyncType(event.nativeEvent.target.value)}}
        >
          <option value="all">All</option>
          <option value="selection">Selection</option>
        </select>
        <button onClick={sync}>Sync</button>
      </div>
    );
  }

  private get rootController() {
    return this.props as RootController;
  }
}
