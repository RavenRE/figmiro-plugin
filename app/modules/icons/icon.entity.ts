export enum IconName {
  LOGOUT = 'logout',
  CHECKED = 'checked',
  UNCHECKED = 'unchecked',
  ARROW = 'arrow',
  COVER = 'cover'
}

export type IconNames = IconName[];
export type IconMarkup = string;
export type IconMarkupByName = {
  [key: string]: IconMarkup;
};
