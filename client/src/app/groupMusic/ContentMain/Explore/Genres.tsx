import { useEffect, useState } from 'react';
import getToken from '../../apiCalls/getToken';
import getAuthHeader from '../../apiCalls/getAuthHeader';
import getExploreTracks from '../../apiCalls/getExploreTracks';
import { SectionData } from './Explore';
import { Loading } from '@/components/Loading/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import styles from './Genres.module.css';

interface GenresProps {
    trackId: string;
}

const Genres: React.FC<GenresProps> = ({ trackId }) => {
    const categories = [
        'Dance', 'Children', 'Classical', 'Indian', 'Rock',
        'Party', 'Pop', 'Romance', 'Sad', 'Study'
    ];
    const [loading, setLoading] = useState(false);
    const [currentGenre, setCurrentGenre] = useState<string | null>(null);
    const [songsData, setSongsData] = useState([]);
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);

    const setGenreSongs = async () => {
        const accessToken = await getToken();
        const authHeader = getAuthHeader(accessToken);
        const res = await getExploreTracks(authHeader, trackId, null, currentGenre!.toLowerCase());
        setLoading(false);
        setSongsData(res.tracks);
    }

    useEffect(() => {
        if(trackId === '' || !trackId || !currentGenre) {
            return;
        }
        setLoading(true);
        setGenreSongs();
    }, [trackId, currentGenre]);

    const openGenreSong = (genre: string) => {
        setCurrentGenre(genre);
    }

    const unsetSingleGenre = () => {
        setCurrentGenre(null);
    }

    return (
        <div className={styles.container}>
            {currentGenre ? <div>
                <div className={styles.goBackBtn} onClick={unsetSingleGenre}>Back</div>
                {loading && <Loading height={20} width={20} />}
                {songsData.length > 0 && !loading && <SectionData title='Tracks' data={songsData} displayTitle={`${currentGenre} Tracks`} />}
            </div> : null}
            {!currentGenre && categories.map((category, index) => (
                <div className={`${styles.category} ${colorMode === 1 && styles.lightCategory}`} key={index} onClick={() => openGenreSong(category)}>
                    {category}
                </div>
            ))}
        </div>
    )
}

export default Genres;