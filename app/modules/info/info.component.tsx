import React from 'react';
import styles from './info.component.sass';
import {Link} from 'components/link';

export const InfoComponent: React.FC = () =>
  <>
    <h2 className={styles.title}>For you information</h2>
    <p>
      Uploaded images go to the Miro through the Redmadrobot server.
      We do not store or process them. The plugin is published as Open Source,
      so you can deploy it on your own server if you wish.
    </p>
    <p>
      Support - <Link href="https://github.com/RedMadRobot/figmiro-plugin/issues"/>
    </p>
  </>;
