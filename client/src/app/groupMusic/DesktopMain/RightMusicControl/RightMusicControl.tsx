import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import socket from '../../../../socket';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import SongImage from '../../../../assets/DefaultCardImg.jpg';
import axios from 'axios';
import { decodeGroupId } from '@/app/utils';
import { setTrackId } from '@/store/slices/applicationState';
import { backendBaseURL } from '@/backendBaseURL';
import getToken from '../../apiCalls/getToken';
import getAuthHeader from '../../apiCalls/getAuthHeader';
import getSingleTrack from '../../apiCalls/getSingleTrack';
import { MusicProgressBar } from './MusicProgressBar';

import styles from './RightMusicControl.module.css';

export const RightMusicControl = () => {
  const [songDetails, setSongDetails] = useState({
    songImage: SongImage,
    songName: '---',
    artists: [],
    duration: 0,
    audio: '',
  });
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);
  const dispatch = useDispatch();
  const currentTrackId = useSelector((state: RootState) => state.applicationState.currentTrackId);
  const encodedGroupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
  const deodedGroupId = decodeGroupId(encodedGroupId);
  const [errorMsg, setErrorMsg] = useState("");

  const updateCurrentMusic = (data: any) => {
    dispatch(setTrackId(data.message.trackId));
  }

  const handleCurrentTrack = async (trackId: string) => {
    if (!trackId || trackId === '') return;
    const accessToken = await getToken();
    const authHeader = getAuthHeader(accessToken);
    const results = await getSingleTrack(authHeader, trackId);
    setSongDetails({
      songImage: results.album.images[0].url, songName: results.name,
      artists: results.album.artists, duration: 10, audio: results.preview_url
    });
    const songName = results.name ? results.name : null;
    const songImage = results.album?.images.length ? results.album.images[0].url : null;

    axios.post(`${backendBaseURL}/groupMusic/currentSong/setSong`, {
      accessToken: Cookies.get('accessToken'),
      groupId: deodedGroupId,
      songName: songName,
      songImage: songImage,
    })
      .then(() => {
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
        handleCurrentTrack(response.data[0].musicId);
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
    handleCurrentTrack(currentTrackId);
  }, [currentTrackId]);

  return (
    <div className={`${styles.RightMusicControl} ${colorMode ? styles.lightModeMain : styles.darkModeMain}`}>
      <div className={styles.songImage}>
        <Image src={songDetails.songImage} alt='Song Image' width={40} height={45} />
        <div className={`${colorMode === 1 ? styles.songDetailLight : styles.songDetailDark}`}>
          <div>{songDetails.songName}</div>
          <div>
            {songDetails.artists.map((artistName: any, index) => {
              return <span key={`${artistName}#${index}`}>
                {artistName.name}
                {index !== songDetails.artists.length - 1 ? ', ' : null}
              </span>;
            })}
          </div>
        </div>
      </div>
      
      <div className={styles.musicProgress}>
        <MusicProgressBar audio={songDetails.audio} />
      </div>
    </div>
  )
}