import React from 'react';
import {createBoard} from 'transport/boards';
import {API_URL, MIRO_APP_CLIENT_ID} from 'services/api-config';

export const InstallAppPage = () => {
  const link =
    `https://miro.com/oauth/authorize?state=${'123'
    }&response_type=code&client_id=${MIRO_APP_CLIENT_ID}&redirect_uri=${API_URL}/oauth`;
  return (
    <div>
      <a
        target="_blank"
        href={link}
      >
        Install
      </a>
      <button onClick={createBoard}>create</button>
    </div>
  );
};
