import {
  nullifyValueByKeyInStorage,
  setValueInStorage,
  getValueFromStorage
} from 'helpers/storage';
import {UserInfo} from './auth.interface';

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

const USER_INFO_KEY = 'user-info';
export function removeUserInfoFromStorage(): void {
  nullifyValueByKeyInStorage({key: USER_INFO_KEY});
}

export function createUserInfoInStorage(userInfo: UserInfo): void {
  setValueInStorage({key: USER_INFO_KEY, value: userInfo});
}

export async function getUserInfoFromStorage(): Promise<UserInfo | undefined> {
  return getValueFromStorage<UserInfo>({key: USER_INFO_KEY});
}
