import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import getToken from '../../apiCalls/getToken';
import getAuthHeader from '../../apiCalls/getAuthHeader';
import searchForResults from '../../apiCalls/searchForResults';
import capitalizeFirstLetter from '../../commonFunctions/CapitalizeFirstLetter';
import playMusic from '../../../../assets/playMusicBack.png'
import defaultImg from '../../../../assets/DefaultCardImg.jpg'

import styles from './SearchAlbum.module.css'

interface SearchAlbumProps {
    searchedText: string;
}

const SearchAlbum: React.FC<SearchAlbumProps> = ({ searchedText }) => {
    const [searchResults, setSearchResults] = useState<any>([]);
    const [showPlayBtn, setShowPlayBtn] = useState(-1);
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
        const results = await searchForResults(authHeader, text, 'album');
        setSearchResults(results);
    }

    return (
        <div className={`${styles.SearchAlbum} ${colorMode === 1 ? styles.SearchAlbumLight : styles.SearchAlbumDark}`}>
            {searchResults.map((item: any, index: number) => (
                <div className={styles.albumSingle} key={item.id} 
                onMouseEnter={() => setShowPlayBtn(index)} onMouseLeave={() => setShowPlayBtn(-1)}
                >
                    <div className={styles.leftSection}>
                        <div className={styles.imageContainer}>
                            <Image className={`${showPlayBtn === index && styles.blurImg}`} src={item.images.length === 0 ? defaultImg : item.images[0].url} width={40} height={40} alt="Album Image" />
                            {showPlayBtn === index && <Image src={playMusic} width={10} height={10} alt="Play" />}
                        </div>
                    </div>
                    <div className={styles.rightSection}>
                        <div className={styles.itemName}>
                            {capitalizeFirstLetter(item.name)}
                        </div>
                        <div className={`${styles.artistName} ${colorMode === 1 ? styles.artistNameLight : styles.artistNameDark}`}>
                            <div className={styles.albumType}>
                                {capitalizeFirstLetter(item.album_type)}
                                {item.artists.length > 0 && <div className={styles.point}></div>}
                            </div>
                            
                            {item.artists.map((artist: any, index: number) => {
                                return <span key={index}>
                                    {artist.name}{index !== (item.artists.length)-1 && ', '}
                                </span>
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SearchAlbum;