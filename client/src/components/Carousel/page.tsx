import React from 'react';
import styles from './page.module.css';

interface CarouselProps {
    totalSection: number;
    activeSection: number;
}

export const Carousel: React.FC<CarouselProps> = ({ totalSection, activeSection }) => {
    const divElements = [];

    for (let i = 0; i < totalSection; i++) {
        divElements.push(
            <span key={i}>
                <span 
                className={`${styles.carouselSingle} ${activeSection === i && styles.activeCarousel}`}>
                    
                </span>
            </span>
        );
    }

    return <div className={styles.Carousel}>{divElements}</div>;
};
