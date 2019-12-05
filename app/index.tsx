import 'babel-polyfill';
import {processAuthStorageOperations} from 'modules/auth/auth.service';
import {processSyncAll} from 'modules/settings/settings.service';

figma.showUI(__html__, {width: 300, height: 270});

figma.ui.onmessage = async msg => {
  await processAuthStorageOperations(figma, msg);
  await processSyncAll(figma, msg);
};
