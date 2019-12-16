import {SettingsAdditionsType} from './settings-additions.entity';
import {Board} from 'modules/boards';

export function createBoardLink(board: Board): string {
  return `https://miro.com/app/board/${board.id}`;
}

export function getAdditionsSettingsTypes(): SettingsAdditionsType[] {
  return Object.values(SettingsAdditionsType);
}
