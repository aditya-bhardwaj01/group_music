import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import getToken from '../../apiCalls/getToken';
import getAuthHeader from '../../apiCalls/getAuthHeader';
import searchForResults from '../../apiCalls/searchForResults';
import playMusic from '../../../../assets/playMusicBack.png'
import capitalizeFirstLetter from '../../commonFunctions/CapitalizeFirstLetter';

import styles from './SearchArtist.module.css'

interface SearchArtistProps {
    searchedText: string
}

const SearchArtist: React.FC<SearchArtistProps> = ({ searchedText }) => {
    const [searchResults, setSearchResults] = useState<any>([]);
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);
    const [showPlayBtn, setShowPlayBtn] = useState(-1);

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
        console.log(results);
        setSearchResults(results);
    }
    
    return (
        <div className={`${styles.SearchArtist} ${colorMode === 1 ? styles.SearchArtistLight : styles.SearchArtistDark}`}>
            {searchResults.map((item: any, index: number) => (
                <div className={styles.artistSingle} key={item.id} 
                onMouseEnter={() => setShowPlayBtn(index)} onMouseLeave={() => setShowPlayBtn(-1)}
                >
                    <div className={styles.leftSection}>
                        <div className={styles.imageContainer}>
                            <Image className={`${showPlayBtn === index && styles.blurImg}`} src={item.images[0].url} width={40} height={40} alt="Artist Image" />
                            {showPlayBtn === index && <Image src={playMusic} width={10} height={10} alt="Play" />}
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