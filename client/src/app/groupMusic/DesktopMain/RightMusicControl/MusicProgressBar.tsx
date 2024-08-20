import React, { useState, useRef } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

import styles from './MusicProgressBar.module.css';

interface MusicProgressBarProps {
    audio: string;
}

export const MusicProgressBar: React.FC<MusicProgressBarProps> = ({ audio }) => {
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            setProgress((current / duration) * 100);
        }
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseFloat(e.target.value);
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            audioRef.current.currentTime = (newProgress / 100) * duration;
            setProgress(newProgress);
        }
    };

    const getSongCompleted = (): number => {
        return 40;
    }

    return (
        <div className={styles.MusicProgressBar}>
            {/* <audio
                ref={audioRef}
                src={audio}
                onTimeUpdate={handleTimeUpdate}
            ></audio>

            <button onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>

            <input
                type="range"
                value={progress}
                onChange={handleProgressChange}
                style={{ width: '300px' }}
            /> */}

            <div className={styles.songProgress}>
                {/* <div className={`${colorMode === 1 ? styles.timeLight1 : styles.timeDark1}`} style={{ marginRight: '5px', fontWeight: 'bold' }}>
                    00:13
                </div> */}
                <audio
                    ref={audioRef}
                    src={audio}
                    onTimeUpdate={handleTimeUpdate}
                ></audio>

                <button onClick={handlePlayPause}>
                    {isPlaying ? 'Pause' : 'Play'}
                </button>

                <input
                    type="range"
                    value={progress}
                    onChange={handleProgressChange}
                    style={{ width: '100%' }}
                />

                {/* <div className={styles.songCompleted} style={{ width: `${getSongCompleted()}%` }}></div>
                <div className={styles.songRemaining} style={{ width: `${(100 - getSongCompleted())}%` }}></div> */}

                {/* <div className={`${colorMode === 1 ? styles.timeLight2 : styles.timeDark2}`} style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                    00:30
                </div> */}
            </div>
        </div>
    );
};


// complete the progress bar properly
// synchronize the song across all the members of the group