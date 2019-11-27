import {observable, action} from 'mobx';
import {Boards, Board} from './boards.entity';
import {getAllBoards} from './boards.service';
import {RootController} from 'rootController';

export class BoardsController {
  @observable boards: Boards = [];
  @observable selectedBoard?: Board;
  @observable fetching = false;
  @observable error = '';

  constructor(private readonly rootController: RootController) {}

  @action.bound async fetchBoards(): Promise<void> {
    const {
      authController: {stateValue}
    } = this.rootController;
    try {
      this.fetching = true;
      this.boards = await getAllBoards(stateValue);
      if (!this.boards.length) return;
      this.selectedBoard = this.boards[0];
    } catch (error) {
      this.error = error;
    } finally {
      this.fetching = false;
    }
  }
}
