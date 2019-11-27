/* tslint:disable:no-any*/
export function sendMessageToFigma(type: string, value?: any): void {
  parent.postMessage({
    pluginMessage: {
      type,
      ...(!!value ? {value} : {})
    }
  }, '*');
}
