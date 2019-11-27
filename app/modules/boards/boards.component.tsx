import React from 'react';
import {connect} from 'utils/connect';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';
import {RootController, InjectedProps} from 'rootController';

@connect(ROOT_CONTROLLER_KEY)
export class BoardsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      boardsController: {boards}
    } = this.rootController;
    return (
      <div>
        {boards.map(board =>
          <div key={board.id}>{board.name}</div>
        )}
      </div>
    );
  }

  async componentDidMount(): Promise<void> {
    await this.rootController.boardsController.fetchBoards();
  }

  private get rootController(): RootController {
    return (this.props as InjectedProps)[ROOT_CONTROLLER_KEY];
  }
}
