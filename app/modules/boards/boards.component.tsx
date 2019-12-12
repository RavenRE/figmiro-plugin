import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {Boards, Board} from 'modules/boards';
import {DDItems, DDItem, Dropdown} from 'components/dropdown';

@connect
export class BoardsComponent extends React.Component {
  render(): React.ReactNode {
    const {
      boards,
      selectedBoard,
      selectBoard
    } = this.controller;
    return (
      <Dropdown
        items={mapBoardsToDDItems(boards)}
        selected={mapBoardToDDItem(selectedBoard)}
        onItemClick={selectBoard}
      />
    );
  }

  private get controller() {
    return (this.props as RootController).boardsController;
  }
}

const PLACEHOLDER_BOARD: Board = {
  id: 'PLACEHOLDER_BOARD',
  title: 'Please, choose Miro\'s board'
};
const mapBoardsToDDItems = (boards: Boards): DDItems => boards.map(mapBoardToDDItem);
const mapBoardToDDItem = (board = PLACEHOLDER_BOARD): DDItem => ({
  id: board.id,
  value: board.title
});
