import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {BoardsComponent} from 'modules/boards';
import {SettingsSelectionComponent} from 'modules/settings-selection';
import {SettingsAdditionsComponent} from 'modules/settings-additions';
import {Button, ButtonMode} from 'components/button';
import {Icon, IconName} from 'modules/icons';
import {Loader} from 'components/loader';
import styles from './settings.component.sass';

@connect
export class SettingsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      authController: {logout},
      settingsController: {
        sync,
        reset
      },
      boardsController: {
        fetching,
        selectedBoard
      }
    } = this.rootController;
    if (fetching) return <Loader/>;
    return (
      <div>
        <div className={styles.intro}>
          <div className={styles.title}>
            Settings
          </div>
          <div
            className={styles['logout-icon']}
            onClick={logout}
          >
            <Icon name={IconName.LOGOUT}/>
          </div>
        </div>
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
            disabled={!selectedBoard}
            onClick={sync}
          >
            Sync
          </Button>
        </div>
      </div>
    );
  }

  componentDidMount() {
    Promise.all([
      this.rootController.boardsController.fetchBoards()
    ]);
  }

  private get rootController(): RootController {
    return (this.props as RootController);
  }
}
