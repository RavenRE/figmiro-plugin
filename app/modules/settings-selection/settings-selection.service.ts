import {AppError} from 'utils/AppError';
import {request} from 'helpers/request';
import {FigmaMessage, MESSAGE_EVENT, sendMessageToFigma} from 'helpers/figmaMessaging';
import {SettingsSelectionType} from './settings-selection.entity';
import {
  ProcessSyncArtboardsDTO,
  CreateImagesInMiroDTO,
  SyncArtboardsDTO
} from './settings-selection.dto';

export function getSelectionTypes(): SettingsSelectionType[] {
  return Object.values(SettingsSelectionType);
}

export async function syncArtboards(
  dto: SyncArtboardsDTO
): Promise<void> {
  try {
    const images = await getImages(dto);
    // await createImagesInMiro({
    //   boardId: dto.board.id,
    //   images
    // });
  } catch (error) {
    throw error;
  }
}

const IMAGES_EXPORTED = 'IMAGES_EXPORTED';
export async function processSyncArtboards(
  figma: PluginAPI,
  msg: FigmaMessage<ProcessSyncArtboardsDTO>
): Promise<void> {
  if (
    !msg.value || (
      msg.type !== SettingsSelectionType.ALL &&
      msg.type !== SettingsSelectionType.SELECTED
    )
  ) return;

  let frames;

  if (msg.type === SettingsSelectionType.ALL) {
    frames = figma.currentPage.findAll(
      node =>
        (node.type === 'FRAME' || node.type === 'GROUP') &&
        !!node.parent &&
        node.parent.type === 'PAGE'
    );
  } else if (msg.type === SettingsSelectionType.SELECTED) {
    frames = figma.currentPage.selection;
  }

  if (!frames) return;

  const images = await Promise.all(frames.map(frame => frame.exportAsync({format: 'PNG'})));
  figma.ui.postMessage({type: IMAGES_EXPORTED, value: JSON.stringify(images)});
}

async function getImages(dto: SyncArtboardsDTO): Promise<string> {
  return new Promise((resolve, reject) => {
    const onMessageEvent = (event: MessageEvent) => {
      const {pluginMessage} = event.data;
      switch (pluginMessage.type) {
        case IMAGES_EXPORTED:
          resolve(pluginMessage.value);
          window.removeEventListener(MESSAGE_EVENT, onMessageEvent);
      }
    };
    try {
      sendMessageToFigma({
        type: dto.selectionType,
        value: new ProcessSyncArtboardsDTO(dto.board.id)
      });
      window.addEventListener(MESSAGE_EVENT, onMessageEvent);
    } catch (error) {
      reject(error);
      window.removeEventListener(MESSAGE_EVENT, onMessageEvent);
    }
  });
}

async function createImagesInMiro(dto: CreateImagesInMiroDTO): Promise<void> {
  try {
    await request.post('/pictures', dto);
  } catch (error) {
    throw new AppError(error.response.data.reason);
  }
}
