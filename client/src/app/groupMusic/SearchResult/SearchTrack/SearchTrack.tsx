import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import getToken from '../../apiCalls/getToken';
import getAuthHeader from '../../apiCalls/getAuthHeader';
import searchForResults from '../../apiCalls/searchForResults';
import Image from 'next/image';
import calculateDuration from '../../commonFunctions/CalculateDuration';
import playMusic from '../../../../assets/playMusicBack.png';
import defaultImg from '../../../../assets/DefaultCardImg.jpg';
import { decodeGroupId } from '@/app/utils';
import { setPlayMusic, setTrackId } from '@/store/slices/applicationState';
import { playMusicEmitter } from '../../../../app/utils';

import styles from './SearchTrack.module.css'

interface SearchTrackProps {
    searchedText: string
}

const SearchTrack: React.FC<SearchTrackProps> = ({ searchedText }) => {
    const [searchResults, setSearchResults] = useState<any>([]);
    const [showPlayBtn, setShowPlayBtn] = useState(-1);
    const dispatch = useDispatch();
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);
    const encodedGroupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
    const decodedGroupId = decodeGroupId(encodedGroupId);

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
        const results = await searchForResults(authHeader, text, 'track');
        setSearchResults(results);
    }

    const callPlayMusic = (event: React.MouseEvent, trackId: string, artistId: string) => {
        event.stopPropagation();
        playMusicEmitter(trackId, artistId, decodedGroupId);
        dispatch(setTrackId(trackId));
        dispatch(setPlayMusic(true));
    }

    return (
        <div className={`${styles.SearchTrack} ${colorMode === 1 ? styles.SearchTrackLight : styles.SearchTrackDark}`}>
            {searchResults && searchResults.map((item: any, index: number) => (
                <div className={styles.trackSingle} key={item.id} onMouseEnter={() => setShowPlayBtn(index)} onMouseLeave={() => setShowPlayBtn(-1)} onClick={(event) => callPlayMusic(event, item.id, item.artists[0].id)}>
                    <div className={styles.leftSection}>
                        <div className={styles.imageContainer}>
                            <Image className={`${showPlayBtn === index && styles.blurImg}`} src={item.album.images.length === 0 ? defaultImg : item.album.images[0].url} width={40} height={40} alt="Song Image" />
                            {showPlayBtn === index && <Image src={playMusic} width={10} height={10} alt="Play" />}
                        </div>
                        <div className={styles.duration}>{calculateDuration(item.duration_ms)}</div>
                    </div>
                    <div className={styles.rightSection}>
                        <div className={styles.itemName}>
                            {item.name}
                        </div>
                        <div className={`${styles.artistName} ${colorMode === 1 ? styles.artistNameLight : styles.artistNameDark}`}>
                            {item.artists.map((artist: any, index: number) => {
                                return <span key={artist.id}>
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

export default SearchTrack;