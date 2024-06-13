import React, { ReactElement, useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import SearchType from './SearchType/SearchType';
import SearchTrack from './SearchTrack/SearchTrack';
import SearchArtist from './SearchArtist/SearchArtist';
import SearchAlbum from './SearchAlbum/SearchAlbum';
import SearchPlaylist from './SearchPlaylist/SearchPlaylist';

import styles from './SearchResult.module.css'


interface SearchResultProps {
  searchedText: string;
}

const SearchResult: React.FC<SearchResultProps> = ({ searchedText }) => {
  const [searchCategory, setSearchCategory] = useState<ReactElement>();
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);
  const searchType = useSelector((state: RootState) => state.applicationState.searchType);

  useEffect(() => {
    switch (searchType) {
      case 'track':
        setSearchCategory(<SearchTrack searchedText={searchedText} />)
        break;
      case 'artist':
        setSearchCategory(<SearchArtist searchedText={searchedText} />)
        break;
      case 'album':
        setSearchCategory(<SearchAlbum searchedText={searchedText} />)
        break;
      case 'playlist':
        setSearchCategory(<SearchPlaylist searchedText={searchedText} />)
        break;
      default:
        setSearchCategory(<></>);
    }
  }, [searchType, searchedText])

  return (
    <div className={`${styles.SearchResult} ${colorMode === 1 ? styles.SearchResultLight : styles.SearchResultDark}`}>
      <SearchType />
      <hr />
      {searchedText === '' && <div className={`${colorMode === 1 ? styles.noResultLight : styles.noResultDark}`}>No results!!</div>}
      {searchedText !== '' && <div className={styles.searchCategory}>{searchCategory}</div>}
    </div>
  )
}

export default SearchResult