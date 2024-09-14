import { RootState } from '@/store/store';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getToken from '../../apiCalls/getToken';
import getAuthHeader from '../../apiCalls/getAuthHeader';
import getExploreArtists from '../../apiCalls/getExploreArtists';
import getExploreTracks from '../../apiCalls/getExploreTracks';
import SingleExploreData from './SingleExploreData';

import styles from './Explore.module.css';

type AuthHeader = {
    Authorization: string;
};

const Explore = () => {
    // const dispatch = useDispatch();
    // const colorMode = useSelector((state: RootState) => state.applicationState.theme);
    const trackId = useSelector((state: RootState) => state.applicationState.currentTrackId);
    const artistId = useSelector((state: RootState) => state.applicationState.currentArtistId);
    const [artists, setArtists] = useState<Array<string>>([]);
    const [tracks, setTracks] = useState<Array<string>>([]);
    
    const getSimilarArtist = useCallback(async (headers: AuthHeader) => {
        console.log("artist");
        const res = await getExploreArtists(headers, artistId);
        setArtists(res.artists);
        // setArtists(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    }, [artistId]);

    const getSimilarTracks = useCallback(async (headers: AuthHeader) => {
        console.log("track");
        const res = await getExploreTracks(headers, trackId, artistId);
        // console.log(res);
        // setTracks(res.tracks);
        setTracks(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    }, [trackId, artistId]);

    const getNewArtist = async () => {
        const accessToken = await getToken();
        const authHeader = getAuthHeader(accessToken);
        await getSimilarArtist(authHeader);
    }

    const getNewTrack = async () => {
        const accessToken = await getToken();
        const authHeader = getAuthHeader(accessToken);
        await getSimilarTracks(authHeader);
    }

    useEffect(() => {
        // getNewExploreData();
    }, []);

    return (
    <div className={styles.Explore}>
        <div className={styles.exploreSection}>
            <div className={styles.sectionLeft}>
                <div className={styles.sectionName}>Artists</div>
                <div className={styles.sectionItems}>
                    {artists.map((artist, index) => <span key={index+'artist'}>{index}<SingleExploreData /></span>)}
                </div>
            </div>
            <div className={styles.sectionRight}>
                abcd
                <button onClick={getNewArtist}>getdata</button>
            </div>
        </div>
        <div className={styles.exploreSection}>
            <div className={styles.sectionLeft}>
                <div className={styles.sectionName}>Tracks</div>
                <div className={styles.sectionItems}>
                    {tracks.map((tracks, index) => <span key={index+'track'}>{index}<SingleExploreData /></span>)}
                </div>
            </div>
            <div className={styles.sectionRight}>
                abcd
                <button onClick={getNewTrack}>getdata</button>
            </div>
        </div>
    </div>
    )
}

export default Explore;