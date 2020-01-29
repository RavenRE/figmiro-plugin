import {SettingsSelectionType} from './settings-selection.entity';

export function getSelectionTypes(): SettingsSelectionType[] {
  return Object.values(SettingsSelectionType);
}
