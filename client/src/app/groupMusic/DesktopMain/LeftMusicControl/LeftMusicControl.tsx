import React from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import prevDark from '../../../../assets/musicPage/bottomMusicControl/prevDark.png';
import prevLight from '../../../../assets/musicPage/bottomMusicControl/prevLight.png';
import playDark from '../../../../assets/musicPage/bottomMusicControl/playDark.png';
import playLight from '../../../../assets/musicPage/bottomMusicControl/playLight.png';
import nextDark from '../../../../assets/musicPage/bottomMusicControl/nextDark.png';
import nextLight from '../../../../assets/musicPage/bottomMusicControl/nextLight.png';

import styles from './LeftMusicControl.module.css'

export const LeftMusicControl = () => {
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);

  return (
    <div className={`${styles.LeftMusicControl} ${colorMode ? styles.lightModeMain : styles.darkModeMain}`}>
        <div className={styles.previousSong}>
          <Image src={colorMode === 1? prevLight : prevDark} alt='previous song' />
        </div>

        <div className={styles.playPause}>
          <Image src={colorMode === 1? playLight : playDark} alt='play song' />
        </div>

        <div className={styles.nextSong}>
          <Image src={colorMode === 1? nextLight : nextDark} alt='next song' />
        </div>
    </div>
  )
}
