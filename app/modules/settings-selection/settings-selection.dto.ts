import {Board} from 'modules/boards';
import {SettingsSelectionType} from './settings-selection.entity';

export class ProcessSyncArtboardsDTO {
  constructor(readonly boardId: string) {}
}

export class CreateImagesInMiroDTO {
  constructor(
    readonly boardId: string,
    readonly images: string
  ) {}
}

export class SyncArtboardsDTO {
  constructor(
    readonly board: Board,
    readonly selectionType: SettingsSelectionType
  ) {}
}
