import {request} from 'services/request';
import {FigmaMessage, MESSAGE_EVENT, sendMessageToFigma} from 'services/sendMessageToFigma';
import {Board} from 'modules/boards';
import {IMAGES_EXPORTED, SYNC_ALL} from './settings.message.types';

class SyncAllDTO {
  constructor(readonly boardId: string) {}
}
export function requestSyncAll(state: string, board: Board) {
  const onMessageEvent = async (event: MessageEvent): Promise<void> => {
    const {pluginMessage} = event.data;
    switch (pluginMessage.type) {
      case IMAGES_EXPORTED:
        await createImagesInMiro(state, board.id, pluginMessage.value);
        break;
    }
  };
  sendMessageToFigma({type: SYNC_ALL, value: new SyncAllDTO(board.id)});
  window.addEventListener(MESSAGE_EVENT, onMessageEvent);
}

export async function processSyncAll(figma: PluginAPI, msg: FigmaMessage<SyncAllDTO>) {
  switch (msg.type) {
    case SYNC_ALL:
      if (!msg.value) break;
      const allFrames = figma.currentPage.findAll(node => node.type === 'FRAME' || node.type === 'GROUP');
      const allImages = await Promise.all(allFrames.map(frame => frame.exportAsync({format: 'PNG'})));
      figma.ui.postMessage({type: IMAGES_EXPORTED, value: JSON.stringify(allImages)});
      break;
  }
}

export async function createImagesInMiro(state: string, boardId: string, images: string): Promise<void> {
  await request.post(`/pictures?state=${state}`, {boardId, images});
}
