import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {BoardsComponent} from 'modules/boards';
import {SettingsSelectionComponent} from 'modules/settings-selection';
import {SettingsAdditionsComponent} from 'modules/settings-additions';
import {Button, ButtonMode} from 'components/button';
import styles from './settings.component.sass';

@connect
export class SettingsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      settingsController: {
        reset
      }
    } = this.rootController;
    return (
      <div>
        Settings
        <BoardsComponent/>
        <div className={styles.wrap}>
          <SettingsSelectionComponent className={styles['settings-item']}/>
          <SettingsAdditionsComponent/>
        </div>
        <div className={styles.btns}>
          <Button
            className={styles.btn}
            onClick={reset}
          >
            Cancel
          </Button>
          <Button
            className={styles.btn}
            mode={ButtonMode.PRIMARY}
          >
            Sync
          </Button>
        </div>
      </div>
    );
  }

  private get rootController(): RootController {
    return (this.props as RootController);
  }
}
