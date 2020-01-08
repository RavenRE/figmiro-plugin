export enum SyncProgressStage {
  IMAGES_EXPORTING = 'IMAGES_EXPORTING',
  IMAGE_SENDING_TO_MIRO = 'IMAGE_SENDING_TO_MIRO',
  CACHE_UPDATING = 'CACHE_UPDATING'
}

export type Pictures = Picture[];
export class Picture {
  constructor(
    readonly id: string,
    readonly image: Uint8Array,
    readonly x: number,
    readonly y: number,
    readonly name: string,
    readonly resourceId?: string
  ) {}
}

export type Widgets = Widget[];
export class Widget {
  constructor(
    readonly figmaId: string,
    readonly resourceId: string,
    readonly name: string
  ) {}
}

type MiroWidgetId = string;
export type ArtboardsCache = {
  [artboardId: string]: MiroWidgetId
};
