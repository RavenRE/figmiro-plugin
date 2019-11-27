import 'babel-polyfill';
import {receiveStateValueFromStorage} from 'modules/auth/auth.service';

figma.showUI(__html__);

figma.ui.onmessage = async msg => {
  await receiveStateValueFromStorage(figma, msg);
};
