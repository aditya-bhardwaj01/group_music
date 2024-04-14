import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import PlayMusic from '../../../assets/playMusic.png';
import { useRouter } from "next/navigation";

import styles from './CardFront.module.css'

interface CardProps {
    dateCreated: string;
    displayName: string;
    groupName: string;
    groupSecretCode: string;
    id: number;
    ownerId: number;
    songImage: string;
    songName: string;
}

interface CardFrontProps {
    groupData: CardProps;
    setShowFront: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardFront: React.FC<CardFrontProps> = ({ groupData, setShowFront }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1023);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1023);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const goToGroupMusic = () => {
        router.push('/groupMusic/'+groupData.groupName);
    }

    return (
        <div className={`${styles.CardFront} ${isHovered && isDesktop && styles.hoveredImage}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <Image src={groupData.songImage} fill alt='SongImage'></Image>
            {
                isHovered && isDesktop &&
                <div className={`${styles.buttonsCard} ${styles.buttonsDesktop}`}>
                    <button onClick={goToGroupMusic}>Join</button>
                    <button onClick={() => setShowFront(false)}>View</button>
                </div>
            }

            <div className={`${styles.imageText} ${!isDesktop && styles.imageTextPhone}`}>
                <h5>{groupData.groupName}</h5>
                <p>
                    {groupData.songName !== "Play you first song" && 
                    <Image src={PlayMusic} height={20} width={20} alt='Play Music' style={{borderRadius: 0}} />} &nbsp;
                    <i>{groupData.songName}</i>
                </p>
            </div>

            {
                !isDesktop &&
                <div className={`${styles.buttonsCard} ${styles.buttonsPhone}`}>
                    <button onClick={goToGroupMusic}>Join</button>
                    <button onClick={() => setShowFront(false)}>View</button>
                </div>
            }
        </div>
    )
}

export default CardFront
