/* tslint:disable:no-any*/
import {
  MESSAGE_EVENT,
  FigmaMessage,
  sendMessageToFigma,
  sendMessageFromFigma
} from 'helpers/figmaMessaging';

const SET_VALUE = 'SET_VALUE';
const GET_VALUE = 'GET_VALUE';
const VALUE_RECEIVED = 'VALUE_RECEIVED';

type SetValueInStorageDTO = {
  key: string;
  value: any;
};

export function setValueInStorage(dto: SetValueInStorageDTO): void {
  sendMessageToFigma({type: SET_VALUE, value: dto});
}

export async function getValueFromStorage(key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const onMessageEvent = (event: MessageEvent) => {
      const {pluginMessage} = event.data;
      switch (pluginMessage.type) {
        case VALUE_RECEIVED:
          resolve(pluginMessage.value);
          window.removeEventListener(MESSAGE_EVENT, onMessageEvent);
      }
    };
    try {
      sendMessageToFigma({type: GET_VALUE, value: {key}});
      window.addEventListener(MESSAGE_EVENT, onMessageEvent);
    } catch (error) {
      reject(error);
      window.removeEventListener(MESSAGE_EVENT, onMessageEvent);
    }
  });
}

const STORAGE_KEY = 'figma2miro_';

export async function processSetValueInStorage(
  figma: PluginAPI,
  msg: FigmaMessage<SetValueInStorageDTO>
): Promise<void> {
  if (
    msg.type !== SET_VALUE ||
    !msg.value
  ) return;
  await figma.clientStorage.setAsync(`${STORAGE_KEY}${msg.value.key}`, msg.value.value);
}

type GetValueFromStorageDTO = {
  key: string;
};
export async function processGetValueFromStorage(
  figma: PluginAPI,
  msg: FigmaMessage<GetValueFromStorageDTO>
): Promise<void> {
  if (
    msg.type !== GET_VALUE ||
    !msg.value
  ) return;
  const value = await figma.clientStorage.getAsync(`${STORAGE_KEY}${msg.value.key}`);
  sendMessageFromFigma(
    figma,
    {type: VALUE_RECEIVED, value}
  );
}
