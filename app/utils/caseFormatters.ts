/* tslint:disable:no-any */

import {
  camelCase,
  snakeCase,
  keys,
  isArray,
  isPlainObject
} from 'lodash';

type IFormatter = (s: string) => string;

interface IIndexed {
  [key: string]: any;
}

const DOT_PATTERN = /\./;

const formatKeyWithDot = (key: string, formatter: IFormatter): string => {
  const keysArr = key.split('.');

  return keysArr.reduce((accString: string, str: string, idx: number) => {
    const separator = idx === keysArr.length - 1 ? '' : '.';
    return accString + formatter(str) + separator;
  }, '');
};

function traverse<T extends IIndexed>(object: T, formatter: IFormatter): any {
  if (isPlainObject(object)) {
    return keys(object).reduce((acc: IIndexed, current: string) => {
      const newName = DOT_PATTERN.test(current)
        ? formatKeyWithDot(current, formatter)
        : formatter(current);

      if (isPlainObject(object[current])) {
        acc[newName] = traverse(object[current], formatter);
      } else if (isArray(object[current])) {
        acc[newName] = traverse(object[current], formatter);
      } else {
        acc[newName] = object[current];
      }

      return acc;
    }, {});
  }
  if (isArray(object)) {
    return object.map((item: T) => traverse(item, formatter));
  }

  return object;
}

export const snakeToCamel = (object: any) => traverse(object, camelCase);
export const camelToSnake = (object: any) => traverse(object, snakeCase);
