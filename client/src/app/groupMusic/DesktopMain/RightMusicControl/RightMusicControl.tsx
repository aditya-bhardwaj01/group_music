import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import socket from '../../../../socket';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import SongImage from '../../../../assets/SongImage.jpg';
import axios from 'axios';
import { decodeGroupId } from '@/app/utils';

import styles from './RightMusicControl.module.css'
import { setTrackId } from '@/store/slices/applicationState';
import { Loading } from '@/components/Loading/Loading';
import { FormError } from '@/components/FormError/page';

export const RightMusicControl = () => {
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);
  const dispatch = useDispatch();
  const currentTrackId = useSelector((state: RootState) => state.applicationState.currentTrackId);
  const encodedGroupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
  const deodedGroupId = decodeGroupId(encodedGroupId);
  const [errorMsg, setErrorMsg] = useState("");

  const updateCurrentMusic = (data: any) => {
    dispatch(setTrackId(data.message.trackId));
  }

  useEffect(() => {
    axios.post('http://localhost:3001/groupMusic/currentSong/getSong', {
      groupId: deodedGroupId,
      accessToken: Cookies.get('accessToken'),
    })
      .then((response) => {
        setErrorMsg("");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 404) {
            setErrorMsg("The resource you are trying to access doesn't exist.");
          }
          if (error.response.status === 500) {
            setErrorMsg("There is a issue on server side. Please try after sometime.");
          }
        } else if (error.request) {
          setErrorMsg("Network error encountered.");
        } else {
          setErrorMsg(error.message);
        }
      })
    
      socket.on('currentMusic', updateCurrentMusic);

      return () => {
          socket.off('currentMusic', updateCurrentMusic);
      };
  }, []);

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
