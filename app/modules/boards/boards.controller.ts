import {observable, action} from 'mobx';
import {IController} from 'utils/Controller';
import {Boards, Board} from './boards.entity';
import {getAllBoards} from './boards.service';

export class BoardsController implements IController {
  @observable boards: Boards = [];
  @observable selectedBoard?: Board;
  @observable fetching = false;
  @observable error = '';

  @action.bound async fetchBoards(): Promise<void> {
    try {
      this.fetching = true;
      this.boards = await getAllBoards();
    } catch (error) {
      this.error = error;
    } finally {
      this.fetching = false;
    }
  }

  @action.bound selectBoard(id: string) {
    this.selectedBoard = this.boards.find((board: Board) => board.id === id);
  }

  @action.bound resetSelected(): void {
    this.selectedBoard = undefined;
  }

  @action.bound reset(): void {
    this.resetSelected();
    this.boards = [];
    this.fetching = false;
    this.error = '';
  }
}
