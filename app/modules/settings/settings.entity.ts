export enum SyncProgressStage {
  INITIAL = 'INITIAL',
  IMAGES_EXPORTING = 'IMAGES_EXPORTING',
  IMAGE_SENDING_TO_MIRO = 'IMAGE_SENDING_TO_MIRO',
  CACHE_UPDATING = 'CACHE_UPDATING'
}

export type Pictures = Picture[];
export type Picture = {
  readonly id: string;
  readonly image: Uint8Array;
  readonly x: number;
  readonly y: number;
  readonly name: string;
  readonly resourceId?: string;
};

export type PicturesBlobed = PictureBlobed[];
export type PictureBlobed = Picture & {
  readonly image: Blob;
};

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
