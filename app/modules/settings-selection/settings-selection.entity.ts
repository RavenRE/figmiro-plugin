export enum SettingsSelectionType {
  ALL = 'all',
  SELECTED = 'selected'
}

export type Pictures = Picture[];
export class Picture {
  constructor(
    readonly id: string,
    readonly image: Uint8Array,
    readonly x: number,
    readonly y: number,
    readonly width: number,
    readonly height: number,
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
