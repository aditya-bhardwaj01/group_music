import React, { ChangeEvent, useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenSearchResult, setSearchType } from '@/store/slices/applicationState';
import Image from 'next/image';
import CloseDark from '../../../../assets/closeMenu.png';
import CloseLight from '../../../../assets/closeLight.png';

import styles from './SearchType.module.css'

const SearchType = () => {
  const dispatch = useDispatch();
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);
  const searchType = useSelector((state: RootState) => state.applicationState.searchType);

  useEffect(() => {
    dispatch(setSearchType('track'));
  }, []);

  const updateSearchType = (type: string) => {
    if(searchType === type) return;
    dispatch(setSearchType(type));
  }

  return (
    <div className={`${styles.SearchType} ${colorMode === 1 ? styles.SearchTypeLight : styles.SearchTypeDark}`}>
        <div className={`${styles.types} ${colorMode === 1 ? styles.typesLight : styles.typesDark}`}>
          <span className={`${searchType === 'track' && styles.activeType}`} onClick={() => updateSearchType('track')}>Track</span>
          <span className={`${searchType === 'artist' && styles.activeType}`} onClick={() => updateSearchType('artist')}>Artist</span>
          <span className={`${searchType === 'album' && styles.activeType}`} onClick={() => updateSearchType('album')}>Album</span>
          <span className={`${searchType === 'playlist' && styles.activeType}`} onClick={() => updateSearchType('playlist')}>Playlist</span>
        </div>
        <div className={styles.closeModal} onClick={() => dispatch(setOpenSearchResult(false))}>
          <Image src={colorMode === 1 ? CloseLight : CloseDark} alt='close'/>
        </div>
    </div>
  )
}

export default SearchType