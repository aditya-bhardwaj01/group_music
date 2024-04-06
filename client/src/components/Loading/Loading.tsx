import React from 'react'
import LoadingGif from '../../assets/loading.gif';
import Image from 'next/image';

import styles from './Loading.module.css'

type LoadingProps = {
    height: number;
    width: number;
};

export const Loading: React.FC<LoadingProps> = ({ height, width }) => {
  return (
    <div className={styles.Loading}>
        <Image src={LoadingGif} height={height} width={width} alt='Loading'></Image>
    </div>
  )
}
