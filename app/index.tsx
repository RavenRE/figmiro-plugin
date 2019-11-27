figma.showUI(__html__);

figma.ui.onmessage = msg => {
  switch (msg.type) {
    case 'SET_STATE':
      figma.clientStorage.setAsync('figma2miro_state', msg.value)
        .then(() => figma.clientStorage.getAsync('figma2miro_state'));
      break;
    case 'GET_STATE':
      figma.clientStorage.getAsync('figma2miro_state')
        .then((value =>
          figma.ui.postMessage(
            {type: 'STATE_RECEIVED', value}
          )
        ));
      break;
  }
};
