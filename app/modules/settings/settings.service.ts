import {request} from 'helpers/request';
import {FigmaMessage, MESSAGE_EVENT, sendMessageToFigma} from 'helpers/figmaMessaging';
import {Board} from 'modules/boards';
import {IMAGES_EXPORTED, SYNC_ALL, SYNC_SELECTION} from './settings.message.types';

class SyncAllDTO {
  constructor(readonly boardId: string) {}
}

class SyncSelectionDTO {
  constructor(readonly boardId: string) {}
}

function setEventListener(board: Board): void {
  const onMessageEvent = async (event: MessageEvent): Promise<void> => {
    const {pluginMessage} = event.data;
    switch (pluginMessage.type) {
      case IMAGES_EXPORTED:
        await createImagesInMiro(board.id, pluginMessage.value);
        break;
    }
  };
  window.addEventListener(MESSAGE_EVENT, onMessageEvent, {once: true});
}

export function requestSyncAll(board: Board): void {
  setEventListener(board);
  sendMessageToFigma({
    type: SYNC_ALL,
    value: new SyncAllDTO(board.id)
  });
}

export function requestSyncSelection(board: Board): void {
  setEventListener(board);
  sendMessageToFigma({
    type: SYNC_SELECTION,
    value: new SyncSelectionDTO(board.id)
  });
}

export async function processSyncAll(figma: PluginAPI, msg: FigmaMessage<SyncAllDTO>) {
  if (!msg.value) {
    return;
  }

  switch (msg.type) {
    case SYNC_ALL:
      const allFrames = figma.currentPage.findAll(node => (node.type === 'FRAME' || node.type === 'GROUP') && node.parent.type === 'PAGE');
      const allImages = await Promise.all(allFrames.map(frame => frame.exportAsync({format: 'PNG'})));
      figma.ui.postMessage({type: IMAGES_EXPORTED, value: JSON.stringify(allImages)});
      break;
    case SYNC_SELECTION:
      const selectedFrames = figma.currentPage.selection;
      const selectedImages = await Promise.all(selectedFrames.map(frame => frame.exportAsync({format: 'PNG'})));
      figma.ui.postMessage({type: IMAGES_EXPORTED, value: JSON.stringify(selectedImages)});
      break;
  }
}

export async function createImagesInMiro(boardId: string, images: string): Promise<void> {
  await request.post('/pictures', {boardId, images});
}
