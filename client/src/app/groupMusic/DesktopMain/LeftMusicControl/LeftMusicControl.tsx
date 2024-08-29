import React, { useEffect } from 'react'
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayMusic } from '@/store/slices/applicationState';
import Image from 'next/image';
import prevDisabled from '../../../../assets/musicPage/bottomMusicControl/prevDisabled.png';
import playDark from '../../../../assets/musicPage/bottomMusicControl/playDark.png';
import playLight from '../../../../assets/musicPage/bottomMusicControl/playLight.png';
import playMusicDisabled from '../../../../assets/musicPage/bottomMusicControl/playDisabled.png';
import pauseDark from '../../../../assets/musicPage/bottomMusicControl/pauseDark.png';
import pauseLight from '../../../../assets/musicPage/bottomMusicControl/pauseLight.png';
import nextDisabled from '../../../../assets/musicPage/bottomMusicControl/nextDisabled.png';
import socket from '@/socket';
import { decodeGroupId } from '@/app/utils';

import styles from './LeftMusicControl.module.css'

export const LeftMusicControl = () => {
  const dispatch = useDispatch();
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);
  const musicPlayStatus = useSelector((state: RootState) => state.applicationState.playMusic);
  const isMusicDisabled = useSelector((state: RootState) => state.applicationState.musicDisabled);
  const encodedGroupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
  const decodedGroupId = decodeGroupId(encodedGroupId);

  const setMusicPlayStatus = () => {
    if (isMusicDisabled) return;
    dispatch(setPlayMusic(!musicPlayStatus));
  }

  const handleMusicPlayStatusChanged = (message: any) => {
    // console.log(message.message.isMusicPlaying);
    dispatch(setPlayMusic(message.message.isMusicPlaying))
  }

  useEffect(() => {
    socket.emit('changeMusicPlayStatus', {
      isMusicPlaying: musicPlayStatus,
      groupId: decodedGroupId,
    });
  }, [musicPlayStatus]);

  useEffect(() => {
    socket.on('musicPlayStatusChanged', handleMusicPlayStatusChanged);

    return () => {
      socket.off('musicPlayStatusChanged', handleMusicPlayStatusChanged);
    }
  }, [])

  return (
    <div className={`${styles.LeftMusicControl} ${colorMode ? styles.lightModeMain : styles.darkModeMain}`}>
      <div className={styles.previousSong}>
        <Image src={prevDisabled} alt='previous song' />
      </div>

      <div className={styles.playPause} onClick={setMusicPlayStatus}>
        {isMusicDisabled ? <Image src={playMusicDisabled} alt='play song' /> : null}
        {musicPlayStatus ?
          (!isMusicDisabled && <Image src={colorMode === 1 ? pauseLight : pauseDark} alt='pause song' />) :
          (!isMusicDisabled && <Image src={colorMode === 1 ? playLight : playDark} alt='play song' />)}
      </div>

      <div className={styles.nextSong}>
        <Image src={nextDisabled} alt='next song' />
      </div>
    </div>
  )
}
