import {observer, inject, IReactComponent, IStoresToProps} from 'mobx-react';

export const createConnect =
  (key: string) =>
  (mapInjectedProps?: IStoresToProps) =>
  <T extends IReactComponent>(target: T) => {
    const observerTarget = observer(target);
    return mapInjectedProps ?
      inject(mapInjectedProps)(observerTarget) :
      inject(key)(observerTarget);
  };
