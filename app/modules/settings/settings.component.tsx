import React from 'react';
import cn from 'classnames';
import {connect} from 'helpers/connect';
import {resize} from 'helpers/resize';
import {getErrorMessage} from 'helpers/getErrorMessage';
import {RootController} from 'rootController';
import {BoardsComponent} from 'modules/boards';
import {SettingsSelectionComponent} from 'modules/settings-selection';
import {SettingsAdditionsComponent} from 'modules/settings-additions';
import {Button, ButtonMode} from 'components/button';
import {Highlighted} from 'components/highlighted';
import {Loader} from 'components/loader';
import {Progress} from 'components/progress';
import {Layout} from 'components/layout';
import {SyncProgressStage} from './settings.entity';
import {SyncErrorType} from './settings.errors';
import styles from './settings.component.sass';

const INITIAL_SIZE = 376;

@connect
export class SettingsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      authController: {logout},
      settingsController: {
        sync,
        fetching: syncFetching,
        totalSyncStages,
        doneStagesAmount,
        resetDoneSyncStages
      },
      boardsController: {
        fetching: boardsFetching,
        selectedBoard
      }
    } = this.rootController;
    if (boardsFetching) return <Loader/>;
    return (
      <Layout className={cn(styles.container, {[styles['is-sync']]: syncFetching})}>
        <Progress
          error={this.error}
          done={doneStagesAmount}
          total={totalSyncStages}
          label={this.progressLabel}
          doneLabel="Sync Done!"
          reset={resetDoneSyncStages}
          className={styles.progress}
        />
        <div className={styles.title}>
          Sync artboards with Miro
        </div>
        <BoardsComponent/>
        <div className={styles.wrap}>
          <SettingsSelectionComponent className={styles['settings-item']}/>
          <SettingsAdditionsComponent/>
        </div>
        <Button
          className={styles.btn}
          mode={ButtonMode.PRIMARY}
          disabled={!selectedBoard}
          onClick={sync}
          fetching={syncFetching}
        >
          Sync
        </Button>
        <div className={styles.mention}>
          Want to use a different account? <Highlighted onClick={logout}>Log out</Highlighted>
        </div>
      </Layout>
    );
  }

  async componentDidMount(): Promise<void> {
    resize({height: INITIAL_SIZE});
    await Promise.all([
      this.rootController.boardsController.fetchBoards()
    ]);
  }

  private get progressLabel(): string | undefined {
    const {currentSyncStage: stage} = this.rootController.settingsController;
    if (!stage) return;
    const mapper = {
      [SyncProgressStage.INITIAL]: '',
      [SyncProgressStage.IMAGES_EXPORTING]: 'Exporting artboards...',
      [SyncProgressStage.IMAGE_SENDING_TO_MIRO]: 'Sending images to Miro...',
      [SyncProgressStage.LONG_PROCESSING]: 'The process may take some time...',
      [SyncProgressStage.CACHE_UPDATING]: 'Updating cache...'
    };
    return mapper[stage];
  }

  private get error(): string | undefined {
    const {error} = this.rootController.settingsController;
    if (!error) return;
    return getErrorMessage<SyncErrorType>(
      {
        [SyncErrorType.NO_ARTBOARDS_SELECTED]: 'There is no artboard selected',
        [SyncErrorType.NO_ARTBOARDS_AT_CANVAS]: 'There are no artboards at canvas'
      },
      error
    );
  }

  private get rootController(): RootController {
    return (this.props as  RootController);
  }
}
