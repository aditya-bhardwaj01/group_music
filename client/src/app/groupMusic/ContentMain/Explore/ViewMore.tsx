import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import styles from './ViewMore.module.css';

interface ViewMore {
    type: string;
    viewMoreData: any;
}

const ViewMore: React.FC<ViewMore> = ({ type, viewMoreData }) => {
    const [show, setShow] = useState(false);
    const modalBodyRef = useRef<HTMLDivElement>(null);
    const detailsSection = useRef<HTMLDivElement>(null);
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);

    useEffect(() => {
        if (show && detailsSection.current && modalBodyRef.current) {
            const heightDetails = detailsSection.current.offsetHeight;
            // modalBodyRef.current.style.setProperty('--colorMode', colorMode);
            modalBodyRef.current.style.setProperty('--popularity', `${viewMoreData.popularity}%`);
            modalBodyRef.current.style.setProperty('--detailsHeight', `${heightDetails}px`);
          }
    }, [show])

    const getMoreDetails = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setShow(true);
    }

    const capitalizeWords = (sentence: string): string => {
        return sentence
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const getArrayData = (data: Array<string>): ReactNode => {
        let result: ReactNode[] = [];
        for (let index = 0; index < data.length; index++) {
            result.push(
                <span key={index}>
                    {capitalizeWords(data[index])}
                    {(index !== data.length - 1) && ', '}
                </span>
            );
        }
        return <>{result}</>;
    }

    return (
        <>
            <button className={styles.viewMore} onClick={(e) => {getMoreDetails(e)}}>
                View More
            </button>

            <Modal show={show} 
                    onHide={() => setShow(false)} 
                    aria-labelled-by="contained-modal-title-vcenter" 
                    data-bs-theme={colorMode === 1 ? 'light' : 'dark'} 
                    size='sm' 
                    centered style={{ color: colorMode === 1 ? 'black' : 'white' }}>
                <Modal.Body className={styles.modalBody}
                    style={{
                        '--backgroundImageUrl': `url(${viewMoreData.image})`
                    } as CSSProperties}
                    ref={modalBodyRef}
                >
                    <div className={styles.initialData}>
                        {viewMoreData.name}
                    </div>
                    <div className={styles.details} ref={detailsSection}>
                        <h6>{capitalizeWords(viewMoreData.type)}</h6>
                        <div>
                            <span className={styles.heading}>
                                {type === 'tracks' ? 'Album' : 'Spotify Followers'}: &nbsp;
                            </span>
                            {type === 'tracks' ? viewMoreData.albumName : viewMoreData.followers}
                        </div>
                        <div>
                            <span className={styles.heading}>
                                {type === 'tracks' ? 'Artists: ' : 'Genres: '}&nbsp;
                            </span>
                            {getArrayData(type === 'tracks' ? viewMoreData.artists : viewMoreData.genres)}
                        </div>
                        <div className={styles.popularity}>
                            <div className={styles.heading}>Popularity (on a scale of 100)</div>
                            <div className={styles.progressBar}>
                                <div className={styles.popularValue}>{viewMoreData.popularity}%</div>
                                <div className={styles.popularBar}></div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ViewMore;