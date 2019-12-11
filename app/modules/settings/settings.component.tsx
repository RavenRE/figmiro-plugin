import React from 'react';
import {connect} from 'helpers/connect';
import {BoardsComponent} from 'modules/boards';
import {SettingsSelectionComponent} from 'modules/settings-selection';
import styles from './settings.component.sass';

@connect
export class SettingsComponent extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        Settings
        <BoardsComponent/>
        <div className={styles.wrap}>
          <SettingsSelectionComponent/>
        </div>
      </div>
    );
  }
}
