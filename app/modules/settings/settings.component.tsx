import React from 'react';
import {BoardsComponent} from 'modules/boards';

export class SettingsComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        Settings
        <BoardsComponent/>
      </div>
    );
  }
}
