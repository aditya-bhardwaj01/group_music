import { RootState } from '@/store/store';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getToken from '../../apiCalls/getToken';
import getAuthHeader from '../../apiCalls/getAuthHeader';
import getExploreArtists from '../../apiCalls/getExploreArtists';
import getExploreTracks from '../../apiCalls/getExploreTracks';
import getArtistTopTracks from '../../apiCalls/getArtistTopTracks';
import Genres from './Genres';
import SingleExploreData from './SingleExploreData';
import { decodeGroupId, playMusicEmitter } from '@/app/utils';
import { setPlayMusic, setTrackId } from '@/store/slices/applicationState';
import DefaultImage from '../../../../assets/DefaultCardImg.jpg';
import { Loading } from '@/components/Loading/Loading';

import styles from './Explore.module.css';

type AuthHeader = {
    Authorization: string;
};

interface SectionDataProps {
    title: string;
    data: any[];
    displayTitle?: string;
    onclick?: (artistId: string, artistName: string) => void;
}

const Explore = () => {
    const trackId = useSelector((state: RootState) => state.applicationState.currentTrackId);
    const artistId = useSelector((state: RootState) => state.applicationState.currentArtistId);
    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [artistName, setArtistName] = useState('');
    const [artistSongs, setArtistsSong] = useState([]);
    const [loadingArtist, setLoadingArtist] = useState(false);
    const [loadingTrack, setLoadingTrack] = useState(false);
    const [loadingArtistTrack, setLoadingArtistTrack] = useState(false);

    const getSimilarArtist = useCallback(async (headers: AuthHeader) => {
        if (artistId === '' || !artistId) return;
        const res = await getExploreArtists(headers, artistId);
        setArtists(res.artists);
        setLoadingArtist(false);
    }, [artistId]);

    const getSimilarTracks = useCallback(async (headers: AuthHeader) => {
        if (artistId === '' || !artistId || trackId === '' || !trackId) return;
        const res = await getExploreTracks(headers, trackId, artistId, null);
        setTracks(res.tracks);
        setLoadingTrack(false);
    }, [trackId, artistId]);

    const getNewExploreData = async () => {
        const accessToken = await getToken();
        const authHeader = getAuthHeader(accessToken);
        setLoadingArtist(true);
        getSimilarArtist(authHeader);
        setLoadingTrack(true);
        getSimilarTracks(authHeader);
    }

    const getArtistsSongs = async (artistId: string, artistName: string) => {
        if(artistId === '' || !artistId) return;
        setLoadingArtistTrack(true);
        const accessToken = await getToken();
        const authHeader = getAuthHeader(accessToken);
        const res = await getArtistTopTracks(authHeader, artistId);
        setArtistName(artistName);
        setArtistsSong(res.tracks);
        setLoadingArtistTrack(false);
    }

    const getNoDataDisplay = (isLoading: boolean, type: number): ReactNode => {
        if(isLoading) return;
        if(type === 0) {
            if(!artistId || artistId === '') return <div>Play you first song to get artists suggestion</div>;
            if(!artists || artists.length === 0) return <div>Can't find similar artists</div>
        } else if(type === 1) {
            if(artistName === '' || !artistName) return <div>Choose an artist to get his top tracks</div>
            if(!artistSongs || artistSongs.length === 0) return <div>Sorry can't find top tracks of {artistName}</div>
        } else {
            if(!trackId || trackId === '') return <div>Play you fist song to get similar songs</div>
            if(!tracks || tracks.length === 0) return <div>Can't find similar songs</div>
        }
    }

    useEffect(() => {
        getNewExploreData();
    }, [trackId, artistId]);

    return (
        <div className={styles.Explore}>
            <div className={styles.exploreSection}>
                <div className={styles.sectionLeft}>
                    {getNoDataDisplay(loadingArtist, 0)}
                    {loadingArtist ? <Loading height={20} width={20} /> : <SectionData title='Artists' data={artists} onclick={getArtistsSongs} />}
                </div>
                <div className={styles.sectionRight}>
                    {getNoDataDisplay(loadingArtistTrack, 1)}
                    {loadingArtistTrack ? <Loading height={20} width={20} /> : <SectionData title='Tracks' data={artistSongs} displayTitle={`Enjoy top songs by ${artistName}`} />}
                </div>
            </div>
            <div className={styles.exploreSection}>
                <div className={styles.sectionLeft}>
                    {getNoDataDisplay(loadingTrack, 2)}
                    {loadingTrack ? <Loading height={20} width={20} /> : <SectionData title='Tracks' data={tracks} />}
                </div>
                <div className={`${styles.sectionRight} ${styles.sectionRightGenres}`}>
                    <Genres trackId={trackId} />
                </div>
            </div>
        </div>
    )
}

export default Explore;

export const SectionData: React.FC<SectionDataProps> = ({ title, data, displayTitle, onclick }) => {
    if(data.length === 0) return;
    const dispatch = useDispatch();
    const encodedGroupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
    const decodedGroupId = decodeGroupId(encodedGroupId);
    const getImageUrl = (title: string, data: any) => {
        if(title === 'Artists') {
            if(data.images[0]?.url) return data.images[0].url;
            return DefaultImage;
        }
        if(data.album.images[0].url) return data.album.images[0].url;
        return DefaultImage;
    }
    const getPrimaryName = (data: any) => {
        return data.name;
    }
    const getSecondaryData = (title: string, data: any) => {
        if(title === 'Artists') {
            return data.genres;
        }
        const namesArray = data.album.artists.map(item => item.name);
        return namesArray;
    }
    const handleClick = (data: any) => {
        if(title === 'Artists') {
            onclick?.(data.id, data.name);
            return;
        }
        const trackId = data.id;
        const artistId = data.artists[0].id;
        playMusicEmitter(trackId, artistId, decodedGroupId);
        dispatch(setTrackId(trackId));
        dispatch(setPlayMusic(true));
    }

    return (
        <>
            <div className={styles.sectionName}>{displayTitle ?? title}</div>
            <div className={styles.sectionItems}>
                {data.map((data, index) => <span key={index + 'track'} onClick={() => handleClick(data)}>
                    <SingleExploreData
                        type={title.toLowerCase()}
                        imageUrl={getImageUrl(title, data)} 
                        primaryName={getPrimaryName(data)} 
                        secondaryData={getSecondaryData(title, data)}
                    />
                </span>)}
            </div>
        </>
    )
}