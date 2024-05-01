import React from 'react'
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMode } from '@/store/slices/applicationState';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ToDark from '../../../../assets/musicPage/topBar/dark.png';
import ToLight from '../../../../assets/musicPage/topBar/light.png';
import SearchSection from '../../SearchSection/SearchSection';
import GroupChat from '../../GroupChat/GroupChat';

import styles from './TopSection.module.css'

const TopSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);

  return (
    <div className={`${styles.TopSection} ${colorMode === 1 ? styles.TopSectionLight : styles.TopSectionDark}`}>
      <SearchSection />
      <GroupChat />
      <button onClick={() => dispatch(toggleMode())} className={`${colorMode === 1 ? styles.toggleModeLight : styles.toggleModeDark}`}>
        <Image src={colorMode === 1 ? ToDark : ToLight} alt='toggle mode' />
      </button>

      <button className={styles.logoutBtn} onClick={() => router.push('/profilePage')}>
        <span>Leave</span>
      </button>
    </div>
  )
}

export default TopSection