import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setMusicPageActive } from '@/store/slices/applicationState';
import Image from 'next/image';
import exploreDark from '../../../../assets/musicPage/Left_plate_icons/App/exploreDark.png';
import exploreLight from '../../../../assets/musicPage/Left_plate_icons/App/exploreLight.png';
import newStuffDark from '../../../../assets/musicPage/Left_plate_icons/App/newStuffDark.png';
import newStuffLight from '../../../../assets/musicPage/Left_plate_icons/App/newStuffLight.png';
import suggestDark from '../../../../assets/musicPage/Left_plate_icons/App/suggestDark.png';
import suggestLight from '../../../../assets/musicPage/Left_plate_icons/App/suggestLight.png';
import topChartsDark from '../../../../assets/musicPage/Left_plate_icons/App/topChartsDark.png';
import topChartsLight from '../../../../assets/musicPage/Left_plate_icons/App/topChartsLight.png';

import favouritesDark from '../../../../assets/musicPage/Left_plate_icons/Personal/favouriteDark.png';
import favouritesLight from '../../../../assets/musicPage/Left_plate_icons/Personal/favouritesLight.png';
import albumsDark from '../../../../assets/musicPage/Left_plate_icons/Personal/albumsDark.png';
import albumsLight from '../../../../assets/musicPage/Left_plate_icons/Personal/albumsLight.png';
import playlistsDark from '../../../../assets/musicPage/Left_plate_icons/Personal/playlistsDark.png';
import playlistsLight from '../../../../assets/musicPage/Left_plate_icons/Personal/playlistsLight.png';
import genresDark from '../../../../assets/musicPage/Left_plate_icons/Personal/genresDark.png';
import genresLight from '../../../../assets/musicPage/Left_plate_icons/Personal/genresLight.png';

import styles from './LeftMenuPlate.module.css'

const LeftMenuPlate = () => {
  const dispatch = useDispatch();
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);
  const activeSection = useSelector((state: RootState) => state.applicationState.musicPageActive);
  const [activeClass, setActiveClass] = useState<string>();

  useEffect(() => {
    if (colorMode === 1) {
      setActiveClass(styles.activeOnMainContentLight);
    } else {
      setActiveClass(styles.activeOnMainContentDark);
    }
  }, [colorMode]);

  const setActiveSection = (setActive: string) => {
    dispatch(setMusicPageActive(setActive));
  }

  return (
    <div className={`${styles.LeftMenuPlate} ${colorMode ? styles.lightModeMain : styles.darkModeMain}`}>
      <div className={styles.mainContent}>
        <div className={styles.mainContentUpper}>
          <div className={styles.mainContentTitle}>
            App
          </div>
          <div className={styles.mainContentOptions}>
            <div className={`${activeSection === 'explore' && activeClass}`} onClick={() => setActiveSection('explore')}>
              <Image className={styles.logoImg} src={colorMode ? exploreLight : exploreDark} alt='Explore' /> Explore
            </div>
            <div className={`${activeSection === 'suggest' && activeClass}`} onClick={() => setActiveSection('suggest')}>
              <Image className={styles.logoImg} src={colorMode ? suggestLight : suggestDark} alt='Suggest' /> Suggest
            </div>
            <div className={`${activeSection === 'topCharts' && activeClass}`} onClick={() => setActiveSection('topCharts')}>
              <Image className={styles.logoImg} src={colorMode ? topChartsLight : topChartsDark} alt='Top Charts' /> Top Charts
            </div>
            <div className={`${activeSection === 'newStuff' && activeClass}`} onClick={() => setActiveSection('newStuff')}>
              <Image className={styles.logoImg} src={colorMode ? newStuffLight : newStuffDark} alt='New Stuff' /> New Stuff
            </div>
          </div>
        </div>
        <br />
        <div className={styles.mainContentUpper}>
          <div className={styles.mainContentTitle}>
            Personal
          </div>
          <div className={styles.mainContentOptions}>
            <div className={`${activeSection === 'favourite' && activeClass}`} onClick={() => setActiveSection('favourite')}>
              <Image className={styles.logoImg} src={colorMode ? favouritesLight : favouritesDark} alt='Favourite' /> Favourite
            </div>
            <div className={`${activeSection === 'albums' && activeClass}`} onClick={() => setActiveSection('albums')}>
              <Image className={styles.logoImg} src={colorMode ? albumsLight : albumsDark} alt='Albums' /> Albums
            </div>
            <div className={`${activeSection === 'playlists' && activeClass}`} onClick={() => setActiveSection('playlists')}>
              <Image className={styles.logoImg} src={colorMode ? playlistsLight : playlistsDark} alt='Playlists' /> Playlists
            </div>
            <div className={`${activeSection === 'genre' && activeClass}`} onClick={() => setActiveSection('genre')}>
              <Image className={styles.logoImg} src={colorMode ? genresLight : genresDark} alt='Genre' /> Genre
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftMenuPlate