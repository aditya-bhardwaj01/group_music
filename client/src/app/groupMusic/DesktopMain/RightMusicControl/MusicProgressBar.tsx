import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';

import styles from './MusicProgressBar.module.css';
import { setPlayMusic } from '@/store/slices/applicationState';

interface MusicProgressBarProps {
    audio: string;
}

export const MusicProgressBar: React.FC<MusicProgressBarProps> = ({ audio }) => {
    const dispatch = useDispatch();
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);
    const musicPlayStatus = useSelector((state: RootState) => state.applicationState.playMusic);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const duration = useRef<number>(30);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        (musicPlayStatus && audio) ? audioRef.current?.play() : audioRef.current?.pause();
    }, [musicPlayStatus, audio]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            duration.current = audioRef.current.duration;
            setCurrentTime(Math.round(current));
            const progressValue = (current / duration.current) * 100;
            setProgress(progressValue);
            if(current === duration.current) {
                dispatch(setPlayMusic(false));
            }
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

    const formatTimeSS = (time: number): string => {
        return String(time).padStart(2, '0');
    };

    return (
        <div className={styles.MusicProgressBar}
        style={{
            '--progress': `${progress}%`,
        }} as CSSProperties>
            <div className={styles.songProgress}>
                <div className={`${colorMode === 1 ? styles.timeLight1 : styles.timeDark1}`} style={{ marginRight: '5px', fontWeight: 'bold' }}>
                    00:{formatTimeSS(currentTime)}
                </div>
                <audio
                    ref={audioRef}
                    src={audio}
                    onTimeUpdate={handleTimeUpdate}
                ></audio>

                <input
                    type="range"
                    value={progress}
                    onChange={handleProgressChange}
                    style={{ width: '100%' }}
                />

                <div className={`${colorMode === 1 ? styles.timeLight2 : styles.timeDark2}`} style={{ marginLeft: '5px', fontWeight: 'bold' }}>
                    00:{!Math.round(duration.current) ? '00' : Math.round(duration.current)}
                </div>
            </div>
        </div>
    );
};


// complete the progress bar properly
// after the song is over turn the pause button back to play button
// when the user enters the group the song automatically starts playing. need to fix this
// synchronize the play pause amongst all members
// update the database with play or pause