import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {rootController} from 'rootController';
import {App} from './App';

// const {
//   authController: {
//     fetchCheckAuth,
//     fetchStateValue
//   }
// } = rootController;
// (async () => {
//   try {
//     await fetchStateValue();
//     await fetchCheckAuth();
//   } finally {
//     render();
//   }
// })();

render();

function render(): void {
  ReactDOM.render(<App/>, document.getElementById('root'));
}
