import 'babel-polyfill';
import {receiveStateValueFromStorage} from 'modules/auth/auth.service';
import {processSyncAll} from 'modules/settings/settings.service';

figma.showUI(__html__);

figma.ui.onmessage = async msg => {
  await receiveStateValueFromStorage(figma, msg);
  await processSyncAll(figma, msg);
};
