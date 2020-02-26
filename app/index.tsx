import 'babel-polyfill';
import {
  processGetValueFromStorage,
  processSetValueInStorage
} from 'helpers/storage';
import {processSyncArtboards} from 'modules/settings/settings.service';
import {processResizing} from 'helpers/resize';

figma.showUI(__html__, {width: 310, height: 352});

figma.ui.onmessage = async msg => {
  processResizing(figma, msg);
  await processGetValueFromStorage(figma, msg);
  await processSetValueInStorage(figma, msg);
  await processSyncArtboards(figma, msg);
};
