/* tslint:disable:no-any*/

export type FigmaMessage = {
  type: string;
  value?: any;
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
