import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import getToken from '../../apiCalls/getToken';
import getAuthHeader from '../../apiCalls/getAuthHeader';
import searchForResults from '../../apiCalls/searchForResults';
import playMusic from '../../../../assets/playMusicBack.png'
import defaultImg from '../../../../assets/DefaultCardImg.jpg'

import styles from './SearchPlaylist.module.css'

interface SearchPlaylistProps {
    searchedText: string
}

const SearchPlaylist: React.FC<SearchPlaylistProps> = ({ searchedText }) => {
    const [searchResults, setSearchResults] = useState<any>([]);
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);

    useEffect(() => {
        makeApiCalls(searchedText);
    }, [])

    useEffect(() => {
        makeApiCalls(searchedText);
    }, [searchedText])

    const makeApiCalls = async (text: string) => {
        setSearchResults([]);
        if (text === '') {
            return;
        }
        const accessToken = await getToken();
        const authHeader = getAuthHeader(accessToken);
        const results = await searchForResults(authHeader, text, 'playlist');
        setSearchResults(results);
    }

    const takeToSpotify = (url: string) => {
        window.open(url, '_blank');
    }

    return (
        <div className={`${styles.SearchPlaylist} ${colorMode === 1 ? styles.SearchPlaylistLight : styles.SearchPlaylistDark}`}>
            {searchResults && searchResults.map((item: any, index: number) => (
                <div className={styles.playlistSingle} key={item.id} onClick={() => takeToSpotify(item.external_urls.spotify)}>
                    <div className={styles.leftSection}>
                        <div className={styles.imageContainer}>
                            <Image src={item.images.length === 0 ? defaultImg : item.images[0].url} width={40} height={40} alt="Playlist Image" />
                        </div>
                    </div>
                    <div className={styles.rightSection}>
                        <div className={styles.itemName}>
                            {item.name}
                        </div>
                        <div className={`${styles.description} ${colorMode === 1 ? styles.descriptionLight : styles.descriptionDark}`}>
                            <span>
                                {item.description}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SearchPlaylist;