import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {rootController} from 'rootController';
import {App} from './App';

(async () => {
  await rootController.authController.checkToken();
  await rootController.iconsController.fetchIcons();
  ReactDOM.render(<App/>, document.getElementById('root'));
})();
