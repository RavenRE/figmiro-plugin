import {observer, inject, IReactComponent, IStoresToProps} from 'mobx-react';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';

export function connect(mapInjectedProps?: IStoresToProps) {
  return <T extends IReactComponent>(target: T) => {
    const observerTaget = observer(target);
    let injectedTarget;
    if (mapInjectedProps) {
      injectedTarget = inject(mapInjectedProps)(observerTaget);
    } else {
      injectedTarget = inject(ROOT_CONTROLLER_KEY)(observerTaget);
    }
    return injectedTarget;
  };
}
