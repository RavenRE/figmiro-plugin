import React from 'react';
import {connect} from 'utils/connect';
import {BoardsComponent} from 'modules/boards';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';
import {InjectedProps, RootController} from 'rootController';

@connect()
export class SettingsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      settingsController: {
        changeSyncType,
        sync
      }
    } = this.rootController;
    return (
      <div>
        Settings
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

  private get rootController(): RootController {
    return (this.props as InjectedProps)[ROOT_CONTROLLER_KEY];
  }
}
