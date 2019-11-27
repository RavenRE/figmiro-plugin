import 'babel-polyfill';
import {receiveStateValueFromStorage} from 'modules/auth/auth.service';

figma.showUI(__html__);

figma.ui.onmessage = async msg => {
  await receiveStateValueFromStorage(figma, msg);
};

const allFrames = figma.currentPage.findAll(node => node.type === 'FRAME' || node.type === 'GROUP');
allFrames.forEach(async frame => {
  const response = await frame.exportAsync({format: 'PNG'});
  console.log(response);
});
