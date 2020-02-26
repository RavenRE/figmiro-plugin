import {getValueFromStorage, setValueInStorage} from 'helpers/storage';

const INFO_SHOWN = 'is-info-shown';

export function setInfoShownStatus(): void {
  setValueInStorage({key: INFO_SHOWN, value: 'yes'});
}

export async function getInfoShownStatus(): Promise<string | undefined> {
  return getValueFromStorage<string>({key: INFO_SHOWN});
}
