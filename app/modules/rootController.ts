import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';
import {AuthController} from 'modules/auth';
import {BoardsController} from 'modules/boards';

export class RootController {
  authController: AuthController;
  boardsController: BoardsController;

  constructor() {
    this.authController = new AuthController(this);
    this.boardsController = new BoardsController(this);
  }
}

export const rootController = new RootController();
export type InjectedProps = {
  [ROOT_CONTROLLER_KEY]: RootController;
};
