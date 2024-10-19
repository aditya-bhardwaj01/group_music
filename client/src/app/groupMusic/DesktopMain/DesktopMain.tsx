import React from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import TopSection from './TopSection/TopSection'
import { ContentMain } from '../ContentMain/ContentMain'
import { MusicControl } from './MusicControl/MusicControl'

import styles from './DesktopMain.module.css'

const DesktopMain = () => {
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);

  return (
    <div className={`${styles.DesktopMain} ${colorMode === 1 ? styles.DesktopMainLight : styles.DesktopMainDark}`}>
      <div className={styles.mainSection}>
        <ContentMain />
        <TopSection />
        <MusicControl />
      </div>
    </div>
  )
}

export default DesktopMain