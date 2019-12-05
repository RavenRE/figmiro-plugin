import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {rootController} from 'rootController';
import {App} from './App';

(async () => {
  await rootController.authController.checkToken();
  ReactDOM.render(<App/>, document.getElementById('root'));
})();
