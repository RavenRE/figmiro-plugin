import 'babel-polyfill';
import {processAuthStorageOperations} from 'modules/auth/auth.service';
import {processSyncArtboards} from 'modules/settings-selection/settings-selection.service';

figma.showUI(__html__, {width: 300, height: 280});

figma.ui.onmessage = async msg => {
  await processAuthStorageOperations(figma, msg);
  await processSyncArtboards(figma, msg);
};
