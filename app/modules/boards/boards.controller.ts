import {observable, action, computed} from 'mobx';
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
      this.boards = await getAllBoards();
      if (!this.boards.length) return;
      this.selectedBoard = this.boards[0];
    } catch (error) {
      this.error = error;
    } finally {
      this.fetching = false;
    }
  }

  @action.bound selectBoard(id: string): void {
    this.selectedBoard = this.boards.find((board: Board) => board.id === id);
  }

  @action.bound resetSelectedBoard(): void {
    this.selectedBoard = void 0;
  }

  @computed get selectedBoardId(): string | void {
    return (this.selectedBoard || {}).id;
  }
}
