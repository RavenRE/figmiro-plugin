import React from 'react';
import {Provider} from 'mobx-react';
import {rootController} from 'rootController';
import {ROOT_CONTROLLER_KEY} from 'modules/ROOT_CONTROLLER_KEY';
import {MainComponent} from 'modules/main';

const controllers = {[ROOT_CONTROLLER_KEY]: rootController};
export const App: React.FC = () =>
  <Provider {...controllers}>
    <MainComponent/>
  </Provider>;
