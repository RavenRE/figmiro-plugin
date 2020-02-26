import React, {useEffect} from 'react';
import {resize} from 'helpers/resize';
import {Link} from 'components/link';
import styles from './info.component.sass';

export const InfoComponent: React.FC = () => {
  useEffect(
    function componentDidMount() {
      resize({height: 275});
    }, []
  );
  return (
    <>
      <h2 className={styles.title}>For you information</h2>
      <div className={styles.pad}>
        Uploaded images go to the Miro through the Redmadrobot server.
        We do not store or process them. The plugin is published as Open Source,
        so you can deploy it on your own server if you wish.
      </div>
      <div>
        Support - <Link href="https://github.com/RedMadRobot/figmiro-plugin/issues"/>
      </div>
    </>
  );
};
