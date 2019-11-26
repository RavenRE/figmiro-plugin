/* tslint:disable:no-any */

import {camelToSnake, snakeToCamel} from 'utils/caseFormatters';

class Storage {
  private prefix = 'from-figma-to-miro';

  get = (key: string, withoutPrefix = false): any | undefined => {
    const value = localStorage.getItem(withoutPrefix ? key : this.keyWithPrefix(key));
    if (value) return snakeToCamel(JSON.parse(value));
    return;
  };

  set = (key: string, value: any): void => {
    localStorage.setItem(
      this.keyWithPrefix(key),
      JSON.stringify(camelToSnake(value))
    );
  };

  remove = (key: string): void => {
    localStorage.removeItem(this.keyWithPrefix(key));
  };

  private keyWithPrefix = (key: string): string => `${this.prefix}-${key}`;
}

export const storage = new Storage();
