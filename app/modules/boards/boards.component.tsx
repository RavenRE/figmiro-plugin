import React from 'react';
import {connect} from 'helpers/connect';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';
import {RootController, InjectedProps} from 'rootController';

@connect
export class BoardsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      boardsController: {
        boards,
        selectedBoardId,
        selectBoard,
        resetSelectedBoard
      }
    } = this.rootController;

    return (
      <div>
        <select>
          <option
            key="default"
            value={void 0}
            selected={!selectedBoardId}
            onClick={resetSelectedBoard}
          >Select board</option>
          {boards.map(board =>
            <option
              key={board.id}
              value={board.id}
              selected={board.id === selectedBoardId}
              onClick={() => selectBoard(board.id)}
            >{board.title}</option>
          )}
        </select>
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
