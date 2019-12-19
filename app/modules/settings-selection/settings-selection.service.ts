import {AppError} from 'utils/AppError';
import {request} from 'helpers/request';
import {setValueInStorage} from 'helpers/storage';
import {FigmaMessage, MESSAGE_EVENT, sendMessageToFigma} from 'helpers/figmaMessaging';
import {Picture, SettingsSelectionType, Widget} from './settings-selection.entity';
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
    const widgets = await createImagesInMiro({
      boardId: dto.board.id,
      images,
      scale: dto.needScale
    });
    console.log(widgets);
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

  const images = await Promise.all(frames.map(async frame => new Picture(
    frame.id,
    await frame.exportAsync({format: 'PNG'}),
    frame.x,
    frame.y,
    frame.width,
    frame.height
  )));
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

async function createImagesInMiro(dto: CreateImagesInMiroDTO): Promise<Widget[]> {
  try {
    const response = await request.post<Widget[]>('/pictures', dto);
    return response.data;
  } catch (error) {
    throw new AppError(error.response.data.reason);
  }
}
