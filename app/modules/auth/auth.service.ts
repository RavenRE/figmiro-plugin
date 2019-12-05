import {
  MESSAGE_EVENT,
  FigmaMessage,
  sendMessageToFigma,
  sendMessageFromFigma
} from 'helpers/figmaMessaging';

const SET_TOKEN_IN_STORAGE = 'SET_TOKEN_IN_STORAGE';
const GET_TOKEN_FROM_STORAGE = 'GET_TOKEN_FROM_STORAGE';
const TOKEN_RECEIVED_FROM_STORAGE = 'TOKEN_RECEIVED_FROM_STORAGE';

export function removeTokenInStorage(): void {
  createTokenInStorage();
}

export function createTokenInStorage(token?: string): void {
  sendMessageToFigma({type: SET_TOKEN_IN_STORAGE, value: token});
}

export async function getTokenFromStorage(): Promise<string> {
  return new Promise((resolve, reject) => {
    const onMessageEvent = (event: MessageEvent) => {
      const {pluginMessage} = event.data;
      switch (pluginMessage.type) {
        case TOKEN_RECEIVED_FROM_STORAGE:
          resolve(pluginMessage.value);
          window.removeEventListener(MESSAGE_EVENT, onMessageEvent);
      }
    };
    try {
      sendMessageToFigma({type: GET_TOKEN_FROM_STORAGE});
      window.addEventListener(MESSAGE_EVENT, onMessageEvent);
    } catch (error) {
      reject(error);
      window.removeEventListener(MESSAGE_EVENT, onMessageEvent);
    }
  });
}

const TOKEN_IN_STORAGE_KEY = 'figma2miro_token';
export async function processAuthStorageOperations(figma: PluginAPI, msg: FigmaMessage): Promise<void> {
  switch (msg.type) {
    case SET_TOKEN_IN_STORAGE:
      await figma.clientStorage.setAsync(TOKEN_IN_STORAGE_KEY, msg.value);
      break;
    case GET_TOKEN_FROM_STORAGE:
      const token = await figma.clientStorage.getAsync(TOKEN_IN_STORAGE_KEY);
      sendMessageFromFigma(
        figma,
        {type: TOKEN_RECEIVED_FROM_STORAGE, value: token}
      );
      break;
  }
}
