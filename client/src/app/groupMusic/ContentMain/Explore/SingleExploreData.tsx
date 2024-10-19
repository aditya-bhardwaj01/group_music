import Image from 'next/image';
import playMusic from '../../../../assets/playMusicBack.png';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import ViewMore from './ViewMore';

import styles from './SingleExploreData.module.css';

interface SectionDataProps {
    type: string;
    imageUrl: string;
    primaryName: string;
    secondaryData: string[];
    spotifyUrl: string;
    viewMoreData?: any;
}

const SingleExploreData: React.FC<SectionDataProps> = ({ type, imageUrl, primaryName, secondaryData, spotifyUrl, viewMoreData }) => {
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);
    const capitalizeWords = (sentence: string): string => {
        return sentence
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    return <div className={`${styles.SingleExploreData} ${colorMode === 1 && styles.SingleExploreDataLight}`}>
        <div className={styles.imageSection}>
            <span className={`${type === 'tracks' && styles.songImage}`}>
                <Image src={imageUrl} height={40} width={40} alt="Suggestion Image" />
            </span>
            {type === 'tracks' && <span className={styles.playIcon}>
                <Image src={playMusic} height={20} width={20} alt="Play music" />
            </span>}
        </div>
        <div className={styles.detailsSection}>
            <div className={styles.name}>
                {primaryName}
            </div>
            <div className={styles.secondary}>
                {
                    secondaryData.map((single, index) => (
                        <span key={index}>
                            {capitalizeWords(single)}
                            {index !== secondaryData.length - 1 && ', '}
                        </span>
                    ))
                }
            </div>
        </div>
        <div className={styles.buttons}>
            <button className={styles.goToSpotify} onClick={(e) => {
                window.open(spotifyUrl, '_blank');
                e.stopPropagation();
            }}>
                View on Spotify
            </button>
            <ViewMore type={type} viewMoreData={viewMoreData}  />
        </div>
    </div>
}

export default SingleExploreData;