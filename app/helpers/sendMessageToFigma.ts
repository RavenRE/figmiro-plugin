/* tslint:disable:no-any*/

export type FigmaMessage<T = any> = {
  type: string;
  value?: T;
};

export const MESSAGE_EVENT = 'message';
export function sendMessageToFigma({type, value}: FigmaMessage): void {
  parent.postMessage({
    pluginMessage: {
      type,
      ...(!!value ? {value} : {})
    }
  }, '*');
}
