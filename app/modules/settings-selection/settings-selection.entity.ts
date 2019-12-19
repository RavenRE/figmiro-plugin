export enum SettingsSelectionType {
  ALL = 'all',
  SELECTED = 'selected'
}

export class Picture {
  constructor(
    readonly id: string,
    readonly image: Uint8Array,
    readonly x: number,
    readonly y: number,
    readonly width: number,
    readonly height: number
  ) {}
}

export class Widget {
  constructor(
    readonly figmaId: string,
    readonly resourceId: string,
    readonly name: string
  ) {}
}
