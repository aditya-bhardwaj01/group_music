import React from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Explore from './Explore/Explore';

import styles from './ContentMain.module.css'

export const ContentMain = () => {
  // const dispatch = useDispatch();
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);
  const activeSection = useSelector((state: RootState) => state.applicationState.musicPageActive);
  
  const activeComponent = () => {
    switch (activeSection) {
      case 'library':
        return <Explore />;
      // case 'search':
      //   return <Search />;
      // case 'profile':
      //   return <Profile />;
      default:
        return <Explore />;
    }
  }

  return (
    <div className={`${styles.ContentMain} ${colorMode === 1 ? styles.ContentMainLight : styles.ContentMainDark}`}>
        {activeComponent()}
    </div>
  )
}
