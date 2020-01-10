import _ from 'lodash';
import {AppError} from 'utils/AppError';
import {request, CancelToken, Canceler} from 'helpers/request';
import {
  getValueFromStorage,
  setValueInStorage,
  nullifyValueByKeyInStorage
} from 'helpers/storage';
import {FigmaMessage, MESSAGE_EVENT, sendMessageToFigma} from 'helpers/figmaMessaging';
import {SettingsSelectionType} from 'modules/settings-selection/settings-selection.entity';
import {
  Pictures,
  Widgets,
  ArtboardsCache,
  Picture,
  SyncProgressStage,
  PicturesBlobed
} from './settings.entity';
import {
  ProcessSyncArtboardsDTO,
  CreateImagesInMiroDTO,
  SyncArtboardsDTO
} from './settings.dto';

export function getProgressStages(): SyncProgressStage[] {
  return Object.values(SyncProgressStage);
}

const EXTENSION = 'PNG';
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
  const images = await Promise.all(frames.map(async (frame): Promise<Picture> => ({
    id: frame.id,
    name: frame.name,
    image: await frame.exportAsync({format: EXTENSION}),
    x: frame.x,
    y: frame.y
  })));
  figma.ui.postMessage({type: IMAGES_EXPORTED, value: images});
}

export async function getImages(dto: SyncArtboardsDTO): Promise<PicturesBlobed> {
  const cache = await getCache();
  return new Promise((resolve, reject) => {
    const onMessageEvent = (event: MessageEvent) => {
      const {pluginMessage} = event.data;
      if (pluginMessage.type !== IMAGES_EXPORTED) return;
      const images = pluginMessage.value as Pictures;
      resolve(images.map(image => ({
        ...image,
        ...((cache && cache[image.id]) ? {resourceId: cache[image.id]} : {}),
        image: new Blob([image.image], {type: `image/${EXTENSION.toLowerCase()}`})
      })) as PicturesBlobed);
      window.removeEventListener(MESSAGE_EVENT, onMessageEvent);
    };
    try {
      sendMessageToFigma({
        type: dto.selectionType,
        value: dto.boardId
      });
      window.addEventListener(MESSAGE_EVENT, onMessageEvent);
    } catch (error) {
      reject(error);
      window.removeEventListener(MESSAGE_EVENT, onMessageEvent);
    }
  });
}

export let cancelCreateImagesInMiro: Canceler | undefined;
export async function createImagesInMiro(
  dto: CreateImagesInMiroDTO
): Promise<Widgets> {
  try {
    const data = new FormData();
    _.chain(dto)
      .omit('images')
      .forEach((value, key) => {
        data.append(key, `${value}`);
      })
      .value();
    dto.images.forEach(image => {
      data.append('image', image.image, `${image.name}.${EXTENSION.toLowerCase()}`);
      data.append('imageMeta', JSON.stringify(_.omit(image, 'image')));
    });
    const response = await request.post<Widgets>('/api/pictures', data, {
      headers: {'content-type': 'multipart/form-data'},
      cancelToken: new CancelToken(c => {
        cancelCreateImagesInMiro = c;
      })
    });
    return response.data;
  } catch (error) {
    throw new AppError(error.response.data.reason);
  }
}

const CACHE_KEY = 'cache';
export async function updateCache(widgets: Widgets): Promise<void> {
  const oldCache = await getCache();
  const newWCache = _.chain(widgets)
    .map(widget => ([
      widget.figmaId,
      widget.resourceId
    ]))
    .fromPairs()
    .value();
  setValueInStorage({
    key: CACHE_KEY,
    value: {...oldCache, ...newWCache}
  });
}

async function getCache(): Promise<ArtboardsCache | undefined> {
  return getValueFromStorage<ArtboardsCache>({key: CACHE_KEY});
}

export function clearCache(): void {
  nullifyValueByKeyInStorage({key: CACHE_KEY});
}
