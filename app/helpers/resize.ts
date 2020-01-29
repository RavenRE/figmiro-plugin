import {FigmaMessage, sendMessageToFigma} from 'helpers/figmaMessaging';

const RESIZE_MSG_TYPE = 'RESIZE';

type ResizeDTO = {
  width?: number;
  height?: number;
};

export function resize(dto: ResizeDTO): void {
  sendMessageToFigma({
    type: RESIZE_MSG_TYPE,
    value: {
      width: dto.width || window.innerWidth,
      height: dto.height || window.innerHeight
    }
  });
}

type ProcessResizingDTO = {
  width: number;
  height: number;
};

export function processResizing(
  figma: PluginAPI,
  msg: FigmaMessage<ProcessResizingDTO>
): void {
  if (
    msg.type !== RESIZE_MSG_TYPE ||
    !msg.value
  ) return;

  figma.ui.resize(msg.value.width, msg.value.height);
}
