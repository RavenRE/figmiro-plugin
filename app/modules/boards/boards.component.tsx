import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';

@connect
export class BoardsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      boards,
      selectedBoardId,
      selectBoard,
      resetSelectedBoard
    } = this.controller;

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
    await this.controller.fetchBoards();
  }

  private get controller() {
    return (this.props as RootController).boardsController;
  }
}
