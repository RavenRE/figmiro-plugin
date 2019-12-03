/* tslint:disable no-any */
import {observer, inject, IReactComponent} from 'mobx-react';

export const createConnect =
  (key: string) =>
  () =>
  <T extends IReactComponent>(target: T) => {
    const observerTarget = observer(target);
    return inject((store: any) => store[key])(observerTarget);
  };
