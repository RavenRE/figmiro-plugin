import uuidv1 from 'uuid/v1';
import uuidv5 from 'uuid/v5';
import {request} from 'services/request';
import {sendMessageToFigma, MESSAGE_EVENT, FigmaMessage} from 'services/sendMessageToFigma';
import {GET_STATE, SET_STATE, STATE_RECEIVED} from './auth.message.types';

const UUID_TOKEN = 'figma2miro';
export function getStateValue(): Promise<string> {
  return new Promise((resolve, reject) => {
    const onMessageEvent = (event: MessageEvent) => {
      const {pluginMessage} = event.data;
      switch (pluginMessage.type) {
        case STATE_RECEIVED:
          if (pluginMessage.value) {
            resolve(pluginMessage.value);
            window.removeEventListener(MESSAGE_EVENT, onMessageEvent);
          } else {
            sendMessageToFigma({
              type: SET_STATE,
              value: uuidv5(UUID_TOKEN, uuidv1())
            });
            sendMessageToFigma({type: GET_STATE});
          }
          break;
      }
    };
    try {
      sendMessageToFigma({type: GET_STATE});
      window.addEventListener(MESSAGE_EVENT, onMessageEvent);
    } catch (error) {
      reject(error);
      window.removeEventListener(MESSAGE_EVENT, onMessageEvent);
    }
  });
}

const STATE_STORAGE_KEY = 'figma2miro_state';
export async function receiveStateValueFromStorage(figma: PluginAPI, msg: FigmaMessage): Promise<void> {
  switch (msg.type) {
    case SET_STATE:
      await figma.clientStorage.setAsync(STATE_STORAGE_KEY, msg.value);
      break;
    case GET_STATE:
      const value = await figma.clientStorage.getAsync(STATE_STORAGE_KEY);
      figma.ui.postMessage({type: STATE_RECEIVED, value});
      break;
  }
}

type CheckAuthResponse = {
  isAuthorized: boolean;
};
export async function checkIsAuth(state: string): Promise<boolean> {
  try {
    const response = await request.get<CheckAuthResponse>(
      '/oauth/check',
      {
        params: {state}
      }
    );
    return response.data.isAuthorized;
  } catch (error) {
    throw error;
  }
}
