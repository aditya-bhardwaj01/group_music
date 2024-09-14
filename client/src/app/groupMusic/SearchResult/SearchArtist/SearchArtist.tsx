import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import getToken from '../../apiCalls/getToken';
import getAuthHeader from '../../apiCalls/getAuthHeader';
import searchForResults from '../../apiCalls/searchForResults';
import playMusic from '../../../../assets/playMusicBack.png'
import capitalizeFirstLetter from '../../commonFunctions/CapitalizeFirstLetter';
import defaultImg from '../../../../assets/DefaultCardImg.jpg'

import styles from './SearchArtist.module.css'

interface SearchArtistProps {
    searchedText: string
}

const SearchArtist: React.FC<SearchArtistProps> = ({ searchedText }) => {
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
        const results = await searchForResults(authHeader, text, 'artist');
        setSearchResults(results);
    }

    const takeToSpotify = (url: string) => {
        window.open(url, '_blank');
    }
    
    return (
        <div className={`${styles.SearchArtist} ${colorMode === 1 ? styles.SearchArtistLight : styles.SearchArtistDark}`}>
            {searchResults && searchResults.map((item: any, index: number) => (
                <div className={styles.artistSingle} key={item.id} onClick={() => takeToSpotify(item.external_urls.spotify)}
                >
                    <div className={styles.leftSection}>
                        <div className={styles.imageContainer}>
                            <Image src={item.images.length === 0 ? defaultImg : item.images[0].url} width={40} height={40} alt="Artist Image" />
                        </div>
                    </div>
                    <div className={styles.rightSection}>
                        <div className={styles.itemName}>
                            {item.name}
                        </div>
                        <div className={`${styles.genreName} ${colorMode === 1 ? styles.genreNameLight : styles.genreNameDark}`}>
                            <div className={styles.artistType}>
                                {capitalizeFirstLetter(item.type)}
                                {item.genres.length > 0 && <div className={styles.point}></div>}
                            </div>
                            
                            {item.genres.map((genre: any, index: number) => {
                                return <span key={index}>
                                    {capitalizeFirstLetter(genre)}{index !== (item.genres.length)-1 && ', '}
                                </span>
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SearchArtist;