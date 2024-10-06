import React, { useEffect, useState } from 'react'

import styles from './MainGroupMusic.module.css';
import DesktopMain from '../DesktopMain/DesktopMain';
import NonDesktopMain from '../NonDesktopMain/NonDesktopMain';

interface MainGroupMusicProps {
  clientId: string | undefined;
  clientSecret: string | undefined;
}

const MainGroupMusic: React.FC<MainGroupMusicProps> = ({ clientId, clientSecret }) => {
  const [isDesktopMode, setIsDesktopMode] = useState(false);

  const updateWindowWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 810) {
        setIsDesktopMode(true);
      } else{
        setIsDesktopMode(false);
      }
    }
  };

  useEffect(() => {
    updateWindowWidth(); 
    window.addEventListener('resize', updateWindowWidth);
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);
  
  return (
    <div className={styles.MainGroupMusic}>
      {/* {isDesktopMode && <DesktopMain />}
      {!isDesktopMode && <NonDesktopMain />} */}

      <DesktopMain />
    </div>
  )
}

export default MainGroupMusic;