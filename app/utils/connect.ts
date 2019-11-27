import {observer, inject, IReactComponent} from 'mobx-react';

export function connect(controllerKey: string) {
  return <T extends IReactComponent>(target: T) =>
    inject(controllerKey)(observer(target));
}
