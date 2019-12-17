export enum SettingsSelectionType {
  ALL = 'all',
  SELECTED = 'selected'
}

export class Picture {
  constructor(
    readonly image: Uint8Array,
    readonly x: number,
    readonly y: number,
    readonly width: number,
    readonly height: number
  ) {}
}
