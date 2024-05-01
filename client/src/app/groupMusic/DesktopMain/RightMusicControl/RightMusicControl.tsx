import React from 'react'
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import SongImage from '../../../../assets/SongImage.jpg';

import styles from './RightMusicControl.module.css'

export const RightMusicControl = () => {
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);

  const getSongCompleted = (): number => {
    return 40;
  }
  
  return (
    <div className={`${styles.RightMusicControl} ${colorMode ? styles.lightModeMain : styles.darkModeMain}`}>
      <div className={styles.songImage}>
        <Image src={SongImage} alt='Song Image' />
        <div className={`${colorMode === 1 ? styles.songDetailLight : styles.songDetailDark}`}>
          <div>On my way</div>
          <div>Alan Walker</div>
        </div>
      </div>

      <div className={styles.songProgress}>
        <div className={`${colorMode === 1 ? styles.timeLight1 : styles.timeDark1}`} style={{marginRight: '5px', fontWeight: 'bold'}}>
          2:36
        </div>
        <div className={styles.songCompleted} style={{width: `${getSongCompleted()}%`}}></div>
        <div className={styles.songRemaining} style={{width: `${(100-getSongCompleted())}%`}}></div>
        <div className={`${colorMode === 1 ? styles.timeLight2 : styles.timeDark2}`} style={{marginLeft: '5px', fontWeight: 'bold'}}>
          5:20
        </div>
      </div>
    </div>
  )
}
