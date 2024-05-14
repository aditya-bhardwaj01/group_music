import React, { ChangeEvent, useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenSearchResult } from '@/store/slices/applicationState';
import Image from 'next/image';
import SearchGray from '../../../assets/searchGray.png';

import styles from './SearchSection.module.css'
import SearchResult from '../SearchResult/SearchResult';

const SearchSection = () => {
  const [searchedText, setSearchedText] = useState('');
  const dispatch = useDispatch();
  const colorMode: number = useSelector((state: RootState) => state.applicationState.theme);
  const showSearchResult: boolean = useSelector((state: RootState) => state.applicationState.openSearchResult);

  const searchTypedText = async (event: ChangeEvent<HTMLInputElement>) => {
    const typedString = event.target.value;
    const trimmedString = typedString.trim();
    setSearchedText(trimmedString);
  }

  return (
    <div className={`${styles.SearchSection} ${colorMode === 1 ? styles.SearchSectionLight : styles.SearchSectionDark}`}>
        <div className={styles.searchText}>
            <div className={styles.searchIcon}>
                <Image src={SearchGray} alt='search icon' />
            </div>
            <div className={`${styles.searchBox} ${colorMode === 1 ? styles.searchBoxLight : styles.searchBoxDark}`}>
                <input placeholder='Search music, artist, album, playlist' type="text" 
                onChange={searchTypedText} 
                onFocus={() => dispatch(setOpenSearchResult(true))}
                />
            </div>
        </div>
        {showSearchResult && <div className={styles.searchResult}>
          <SearchResult searchedText={searchedText} />
        </div>}
    </div>
  )
}

export default SearchSection