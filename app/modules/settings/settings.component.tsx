import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {BoardsComponent} from 'modules/boards';
import {SettingsSelectionComponent} from 'modules/settings-selection';
import {SettingsAdditionsComponent} from 'modules/settings-additions';
import {Button, ButtonMode} from 'components/button';
import {Icon, IconName} from 'modules/icons';
import {Loader} from 'components/loader';
import {Progress} from 'components/progress';
import {SyncProgressStage} from './settings.entity';
import styles from './settings.component.sass';

@connect
export class SettingsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      authController: {logout},
      settingsController: {
        sync,
        reset,
        fetching: syncFetching,
        totalSyncStages,
        doneStagesAmount,
        currentSyncStage
      },
      boardsController: {
        fetching: boardsFetching,
        selectedBoard
      }
    } = this.rootController;
    if (boardsFetching) return <Loader/>;
    return (
      <>
        <Progress
          done={doneStagesAmount}
          total={totalSyncStages}
          label={mapSyncStageToProgressLabel(currentSyncStage)}
          doneLabel={DONE_LABEL}
          className={styles.progress}
        />
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
          <Button className={styles.btn} onClick={reset}>
            Cancel
          </Button>
          <Button
            className={styles.btn}
            mode={ButtonMode.PRIMARY}
            disabled={!selectedBoard}
            onClick={sync}
            fetching={syncFetching}
          >
            Sync
          </Button>
        </div>
      </>
    );
  }

  async componentDidMount() {
    await Promise.all([
      this.rootController.boardsController.fetchBoards()
    ]);
  }

  private get rootController(): RootController {
    return (this.props as RootController);
  }
}

const mapSyncStageToProgressLabel = (stage?: SyncProgressStage): string | undefined => {
  if (!stage) return;
  const mapper = {
    [SyncProgressStage.IMAGES_EXPORTING]: 'Exporting artboards...',
    [SyncProgressStage.IMAGE_SENDING_TO_MIRO]: 'Sending images to Miro...',
    [SyncProgressStage.CACHE_UPDATING]: 'Updating cache...'
  };
  return mapper[stage];
};
const DONE_LABEL = 'Sync Done!';
