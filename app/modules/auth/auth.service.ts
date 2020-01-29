import {
  nullifyValueByKeyInStorage,
  setValueInStorage,
  getValueFromStorage
} from 'helpers/storage';

const TOKEN_KEY = 'token';

export function removeTokenFromStorage(): void {
  nullifyValueByKeyInStorage({key: TOKEN_KEY});
}

export function createTokenInStorage(token: string): void {
  setValueInStorage({key: TOKEN_KEY, value: token});
}

export async function getTokenFromStorage(): Promise<string | undefined> {
  return getValueFromStorage<string>({key: TOKEN_KEY});
}
