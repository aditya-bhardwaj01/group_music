import React from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Explore from './Explore/Explore';

import styles from './ContentMain.module.css'

export const ContentMain = () => {
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);

  return (
    <div className={`${styles.ContentMain} ${colorMode === 1 ? styles.ContentMainLight : styles.ContentMainDark}`}>
        <Explore />
    </div>
  )
}
