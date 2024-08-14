import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import socket from '../../../../socket';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import SongImage from '../../../../assets/SongImage.jpg';
import axios from 'axios';
import { decodeGroupId } from '@/app/utils';
import { setTrackId } from '@/store/slices/applicationState';
import { backendBaseURL } from '@/backendBaseURL';
import getToken from '../../apiCalls/getToken';
import getAuthHeader from '../../apiCalls/getAuthHeader';
import getSingleTrack from '../../apiCalls/getSingleTrack';

import styles from './RightMusicControl.module.css';

export const RightMusicControl = () => {
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);
  const dispatch = useDispatch();
  const currentTrackId = useSelector((state: RootState) => state.applicationState.currentTrackId);
  const encodedGroupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
  const deodedGroupId = decodeGroupId(encodedGroupId);
  const [errorMsg, setErrorMsg] = useState("");

  const updateCurrentMusic = (data: any) => {
    dispatch(setTrackId(data.message.trackId));
    handleCurrentTrack(data.message.trackId, false);
  }

  const handleCurrentTrack = async (trackId: string, reload: boolean) => {
    if(!trackId || trackId === '') return;
    const accessToken = await getToken();
    const authHeader = getAuthHeader(accessToken);
    const results = await getSingleTrack(authHeader, trackId);

    const songName = results.name ? results.name : null;
    const songImage = results.album?.images.length ? results.album.images[0].url : null;
    if(reload) return;

    axios.post(`${backendBaseURL}/groupMusic/currentSong/setSong`, {
      accessToken: Cookies.get('accessToken'),
      groupId: deodedGroupId,
      songName: songName,
      songImage: songImage,
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
      });
  }

  useEffect(() => {
    axios.post(`${backendBaseURL}/groupMusic/currentSong/getSong`, {
      groupId: deodedGroupId,
      accessToken: Cookies.get('accessToken'),
    })
      .then((response) => {
        setErrorMsg("");
        handleCurrentTrack(response.data[0].musicId, true);
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
      });

    socket.on('currentMusic', updateCurrentMusic);

    return () => {
      socket.off('currentMusic', updateCurrentMusic);
    };
  }, []);

  useEffect(() => {
    handleCurrentTrack(currentTrackId, false);
  }, [currentTrackId]);

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
        <div className={`${colorMode === 1 ? styles.timeLight1 : styles.timeDark1}`} style={{ marginRight: '5px', fontWeight: 'bold' }}>
          2:36
        </div>
        <div className={styles.songCompleted} style={{ width: `${getSongCompleted()}%` }}></div>
        <div className={styles.songRemaining} style={{ width: `${(100 - getSongCompleted())}%` }}></div>
        <div className={`${colorMode === 1 ? styles.timeLight2 : styles.timeDark2}`} style={{ marginLeft: '5px', fontWeight: 'bold' }}>
          5:20
        </div>
      </div>
    </div>
  )
}


// database update for groupsdatadone
// need to add a new column of currentSongStatus in groupsSongDetails table to see if the song is playing
// start playing the song on the frontend