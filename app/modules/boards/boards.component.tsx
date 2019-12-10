import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {Boards} from 'modules/boards';
import {DDItems, Dropdown} from 'components/dropdown';

@connect
export class BoardsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      boards,
      selectBoard
    } = this.controller;
    return (
      <Dropdown
        items={mapBoardsToDDItems(boards)}
        onItemClick={selectBoard}
      />
    );
  }

  async componentDidMount(): Promise<void> {
    await this.controller.fetchBoards();
  }

  private get controller() {
    return (this.props as RootController).boardsController;
  }
}

function mapBoardsToDDItems(boards: Boards): DDItems {
  return boards
    .map(board => ({
      id: board.id,
      value: board.title
    }));
}
