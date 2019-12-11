import {SettingsAdditionsType} from './settings-additions.entity';

export function getAdditionsSettingsTypes(): SettingsAdditionsType[] {
  return Object.values(SettingsAdditionsType);
}
