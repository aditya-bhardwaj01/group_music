import React, { useEffect } from 'react'
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setPlayMusic } from '@/store/slices/applicationState';
import Image from 'next/image';
import socket from '@/socket';
import { decodeGroupId } from '@/app/utils';
import playDark from '../../../../assets/musicPage/bottomMusicControl/playDark.png';
import playMusicDisabled from '../../../../assets/musicPage/bottomMusicControl/playDisabled.png';
import pauseDark from '../../../../assets/musicPage/bottomMusicControl/pauseDark.png';

import styles from './LeftMusicControl.module.css'

export const LeftMusicControl = () => {
  const dispatch = useDispatch();
  const musicPlayStatus = useSelector((state: RootState) => state.applicationState.playMusic);
  const isMusicDisabled = useSelector((state: RootState) => state.applicationState.musicDisabled);
  const encodedGroupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
  const decodedGroupId = decodeGroupId(encodedGroupId);

  const setMusicPlayStatus = () => {
    if (isMusicDisabled) return;
    socket.emit('changeMusicPlayStatus', {
      isMusicPlaying: !musicPlayStatus,
      groupId: decodedGroupId,
    });
    dispatch(setPlayMusic(!musicPlayStatus));
  }

  const handleMusicPlayStatusChanged = (message: any) => {
    dispatch(setPlayMusic(message.message.isMusicPlaying))
  }

  useEffect(() => {
    socket.on('musicPlayStatusChanged', handleMusicPlayStatusChanged);

    return () => {
      socket.off('musicPlayStatusChanged', handleMusicPlayStatusChanged);
    }
  }, [])

  return (
    <div className={styles.LeftMusicControl}>
      <div className={`${styles.playPause} ${isMusicDisabled && styles.playDisabled}`} onClick={setMusicPlayStatus}>
        {isMusicDisabled ? <Image src={playMusicDisabled} alt='play song' /> : null}
        {musicPlayStatus ?
          (!isMusicDisabled && <Image src={pauseDark} alt='pause song' />) :
          (!isMusicDisabled && <Image src={playDark} alt='play song' />)}
      </div>
    </div>
  )
}
