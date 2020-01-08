import {SettingsSelectionType} from 'modules/settings-selection';
import {Pictures} from './settings.entity';

export class ProcessSyncArtboardsDTO {
  constructor(readonly boardId: string) {}
}

export class CreateImagesInMiroDTO {
  constructor(
    readonly boardId: string,
    readonly images: Pictures,
    readonly scale: boolean
  ) {}
}

export class SyncArtboardsDTO {
  constructor(
    readonly boardId: string,
    readonly selectionType: SettingsSelectionType
  ) {}
}
