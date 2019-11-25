import React from 'react';
import ReactDOM from 'react-dom';
import './uikit/normalize.sass';
import {HotApp, App} from './App';

const root = document.getElementById('root');

// @ts-ignore
if (module.hot) {
  ReactDOM.render(<HotApp />, root);
} else {
  ReactDOM.render(<App />, root);
}
