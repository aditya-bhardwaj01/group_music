import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import socket from '../../../../socket';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import SongImage from '../../../../assets/DefaultCardImg.jpg';
import axios from 'axios';
import { decodeGroupId } from '@/app/utils';
import { setArtistId, setMusicDisabled, setPlayMusic, setTrackId } from '@/store/slices/applicationState';
import { backendBaseURL } from '@/backendBaseURL';
import getToken from '../../apiCalls/getToken';
import getAuthHeader from '../../apiCalls/getAuthHeader';
import getSingleTrack from '../../apiCalls/getSingleTrack';
import { MusicProgressBar } from './MusicProgressBar';
import { LeftMusicControl } from '../LeftMusicControl/LeftMusicControl';

import styles from './MusicControl.module.css';

export const MusicControl = () => {
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
    dispatch(setPlayMusic(true));
    dispatch(setTrackId(data.message.trackId));
  }

  const handleCurrentTrack = async (trackId: string) => {
    if (!trackId || trackId === '') {
      dispatch(setMusicDisabled(true));
      return;
    }
    const accessToken = await getToken();
    const authHeader = getAuthHeader(accessToken);
    const results = await getSingleTrack(authHeader, trackId);
    if(!results.preview_url) dispatch(setMusicDisabled(true));
    else dispatch(setMusicDisabled(false));
    setSongDetails({
      songImage: results.album.images[0].url, songName: results.name,
      artists: results.album.artists, duration: 10, audio: results.preview_url
    });
    dispatch(setArtistId(results.album.artists[0].id));
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
        dispatch(setPlayMusic(response.data[0].playing));
        dispatch(setTrackId(response.data[0].musicId));
        dispatch(setArtistId(response.data[0].artistId));
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
    <div className={`${styles.MusicControl} ${colorMode ? styles.lightModeMain : styles.darkModeMain}`}>
      <div className={styles.songImage}>
        <div className={styles.imageContainer}>
          <Image src={songDetails.songImage} alt='Song Image' width={40} height={45} />
          <div className={styles.musicBtn}><LeftMusicControl /></div>
        </div>
        <div className={`${styles.songDetail} ${colorMode === 1 ? styles.songDetailLight : styles.songDetailDark}`}>
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