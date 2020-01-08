import 'babel-polyfill';
import {
  processGetValueFromStorage,
  processSetValueInStorage
} from 'helpers/storage';
import {processSyncArtboards} from 'modules/settings/settings.service';

figma.showUI(__html__, {width: 300, height: 280});

figma.ui.onmessage = async msg => {
  await processGetValueFromStorage(figma, msg);
  await processSetValueInStorage(figma, msg);
  await processSyncArtboards(figma, msg);
};
