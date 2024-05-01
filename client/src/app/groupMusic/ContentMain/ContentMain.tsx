import React from 'react'
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMode } from '@/store/slices/applicationState';

import styles from './ContentMain.module.css'

export const ContentMain = () => {
  const dispatch = useDispatch();
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);

  return (
    <div className={`${styles.ContentMain} ${colorMode === 1 ? styles.ContentMainLight : styles.ContentMainDark}`}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Magni mollitia, labore odit delectus id dolore ipsum aliquam earum libero 
        voluptas nostrum ratione? Qui molestias odit libero hic dignissimos accusantium dolor.
    </div>
  )
}
