import React from 'react';
import {hot} from 'react-hot-loader/root';
import { Button } from '@components/Button/Button';

const __svg__ = {
  path: './assets/**/*.svg',
  name: 'sprite.svg'
};

/* tslint:disable-next-line no-require-imports no-var-requires */
require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

export const App = () => <h1><Button /></h1>;
export const HotApp = hot(App);
