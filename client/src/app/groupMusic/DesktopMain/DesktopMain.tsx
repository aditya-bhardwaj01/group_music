import React from 'react'
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import LeftMenuPlate from './LeftMenuPlate/LeftMenuPlate'
import TopSection from './TopSection/TopSection'
import { ContentMain } from '../ContentMain/ContentMain'
import { LeftMusicControl } from './LeftMusicControl/LeftMusicControl'
import { RightMusicControl } from './RightMusicControl/RightMusicControl'

import styles from './DesktopMain.module.css'

const DesktopMain = () => {
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);

  return (
    <div className={`${styles.DesktopMain} ${colorMode === 1 ? styles.DesktopMainLight : styles.DesktopMainDark}`}>
      <div className={styles.leftMenuPlate}>
        <LeftMenuPlate />
        <LeftMusicControl />
      </div>

      <div className={styles.mainSection}>
        <TopSection />
        <ContentMain />
        <RightMusicControl />
      </div>
    </div>
  )
}

export default DesktopMain