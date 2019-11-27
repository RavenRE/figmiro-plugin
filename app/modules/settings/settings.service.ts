import {sendMessageToFigma} from 'services/sendMessageToFigma';
import {Board} from 'modules/boards';
import {SYNC_ALL} from './settings.message.types';

export function requestSyncAll(board: Board) {
  sendMessageToFigma({type: SYNC_ALL, value: {boardId: board.id}});
}
