import 'babel-polyfill';
import React from 'react';
import uuidv1 from 'uuid/v1';
import uuidv5 from 'uuid/v5';
import ReactDOM from 'react-dom';
import {sendMessageToFigma} from 'services/sendMessageToFigma';
import {App} from './App';
import {rootController} from 'rootController';

sendMessageToFigma('GET_STATE');
window.onmessage = event => {
  const {pluginMessage} = event.data;
  switch (pluginMessage.type) {
    case 'STATE_RECEIVED':
      if (pluginMessage.value) {
        rootController.authController.changeStateValue(pluginMessage.value);
      } else {
        sendMessageToFigma('SET_STATE', uuidv5('figma2miro', uuidv1()));
        sendMessageToFigma('GET_STATE');
      }
  }
};
ReactDOM.render(<App/>, document.getElementById('root'));
