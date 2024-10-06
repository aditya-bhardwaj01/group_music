import React, { ChangeEvent, useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useSelector, useDispatch } from 'react-redux';
import { setOpenSearchResult, setSearchOpenOnPhone } from '@/store/slices/applicationState';
import Image from 'next/image';
import SearchGray from '../../../assets/searchGray.png';
import CloseDark from '../../../assets/closeMenu.png';
import CloseLight from '../../../assets/closeLight.png';
import SearchResult from '../SearchResult/SearchResult';

import styles from './SearchSection.module.css'

const SearchSection = () => {
  const [searchedText, setSearchedText] = useState('');
  const dispatch = useDispatch();
  const colorMode: number = useSelector((state: RootState) => state.applicationState.theme);
  const showSearchResult: boolean = useSelector((state: RootState) => state.applicationState.openSearchResult);
  const searchOpenOnPhone = useSelector((state: RootState) => state.applicationState.searchOpenOnPhone);

  const searchTypedText = async (event: ChangeEvent<HTMLInputElement>) => {
    const typedString = event.target.value;
    const trimmedString = typedString.trim();
    setSearchedText(trimmedString);
  }

  return (
    <div className={`${styles.SearchSection} ${colorMode === 1 ? styles.SearchSectionLight : styles.SearchSectionDark}`}>
        <div className={styles.searchText}>
            <div className={styles.searchIcon} onClick={() => dispatch(setSearchOpenOnPhone(true))}>
                <Image src={SearchGray} alt='search icon' />
            </div>
            <div className={`${styles.searchBox} ${colorMode === 1 ? styles.searchBoxLight : styles.searchBoxDark} ${!searchOpenOnPhone && styles.searchBoxClose}`}>
                <input placeholder='Search music, artist, album, playlist' type="text" 
                onChange={searchTypedText} 
                onFocus={() => dispatch(setOpenSearchResult(true))}
                />
            </div>
            <div className={`${styles.closeSearch}  ${!searchOpenOnPhone && styles.hideCloseSearch}`} onClick={() => dispatch(setSearchOpenOnPhone(false))}>
              <Image src={colorMode === 1 ? CloseLight : CloseDark} alt='close'/>
            </div>
        </div>
        {showSearchResult && <div className={styles.searchResult}>
          <SearchResult searchedText={searchedText} />
        </div>}
    </div>
  )
}

export default SearchSection