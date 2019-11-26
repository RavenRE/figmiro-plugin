import React from 'react';
import {createBoard} from 'transport/boards';
import {API_URL, MIRO_APP_CLIENT_ID} from 'services/api-config';

const INSTALL_LINK =
  `https://miro.com/oauth/authorize?response_type=code&client_id=${MIRO_APP_CLIENT_ID}&redirect_uri=${API_URL}/oauth`;
export const InstallAppPage = () =>
  <div>
    <a
      target="_blank"
      href={INSTALL_LINK}
    >
      Install
    </a>
    <button onClick={createBoard}>create</button>
  </div>;
