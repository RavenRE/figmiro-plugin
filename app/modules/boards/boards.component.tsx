import React from 'react';
import {connect} from 'helpers/connect';
import {RootController} from 'rootController';
import {Boards, Board} from 'modules/boards';
import {DDItems, DDItem, onDDChange, Dropdown} from 'components/dropdown';

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
        options={mapBoardsToDDItems(boards)}
        defaultValue={mapBoardToDDItem(selectedBoard)}
        onChange={mapSelectBoardToDDOnChange(selectBoard)}
        noOptionsMessage={noOptionsMessage}
      />
    );
  }

  private get controller() {
    return (this.props as RootController).boardsController;
  }
}

const PLACEHOLDER_BOARD: DDItem = {
  value: 'PLACEHOLDER_BOARD',
  label: 'Please, choose Miro\'s board'
};
const noOptionsMessage = () => 'No such board';
const mapBoardsToDDItems = (boards: Boards): DDItems => boards.map(mapBoardToDDItem);
const mapBoardToDDItem = (board?: Board): DDItem => board ? ({
  value: board.id,
  label: board.title
}) : PLACEHOLDER_BOARD;
const mapSelectBoardToDDOnChange =
  (selectBoard: (id: string) => void): onDDChange =>
  (option): void => {
      selectBoard((option as DDItem).value);
  };
