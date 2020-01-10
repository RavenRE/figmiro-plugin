import {SettingsSelectionType} from 'modules/settings-selection';
import {PicturesBlobed} from './settings.entity';

export class ProcessSyncArtboardsDTO {
  constructor(readonly boardId: string) {}
}

export class CreateImagesInMiroDTO {
  constructor(
    readonly boardId: string,
    readonly images: PicturesBlobed,
    readonly scale: boolean
  ) {}
}

export class SyncArtboardsDTO {
  constructor(
    readonly boardId: string,
    readonly selectionType: SettingsSelectionType
  ) {}
}
