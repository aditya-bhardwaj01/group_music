import React, { ChangeEvent, useState } from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import SearchGray from '../../../assets/searchGray.png';
import getToken from '../apiCalls/getToken';
import getAuthHeader from '../apiCalls/getAuthHeader';
import searchForArtist from '../apiCalls/searchForArtists';

import styles from './SearchSection.module.css'

const SearchSection = () => {
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);
  const [searchType, setSearchType] = useState('');

  const searchTypedText = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchedText = event.target.value;
    const accessToken = await getToken();
    const authHeader = getAuthHeader(accessToken);
    const artist = await searchForArtist(authHeader, searchedText);
    console.log(artist);
    ////////////////////////////////////////////////////////////////
  }

  return (
    <div className={`${styles.SearchSection} ${colorMode === 1 ? styles.SearchSectionLight : styles.SearchSectionDark}`}>
        <div className={styles.searchText}>
            <div className={styles.searchIcon}>
                <Image src={SearchGray} alt='search icon' />
            </div>
            <div className={`${styles.searchBox} ${colorMode === 1 ? styles.searchBoxLight : styles.searchBoxDark}`}>
                <input placeholder='Search music, album, artist' type="text" onChange={searchTypedText} />
            </div>
        </div>
    </div>
  )
}

export default SearchSection