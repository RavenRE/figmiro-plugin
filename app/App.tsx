import React from 'react';
import {InstallAppPage} from 'pages/InstallApp/InstallAppPage';

type Props = {
  stateValue: string;
};
export const App: React.FC<Props> = ({stateValue}) =>
  <InstallAppPage stateValue={stateValue}/>;
