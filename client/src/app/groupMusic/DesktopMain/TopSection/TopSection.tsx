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
import socket from '../../../../socket';
import { Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

import styles from './TopSection.module.css';
import { decodeGroupId } from '@/app/utils';

interface ExtendedSocket extends Socket {
  hasEmittedNewUser?: boolean;
}

const TopSection = () => {
  const extendedSocket = socket as ExtendedSocket;
  const router = useRouter();
  const dispatch = useDispatch();
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);
  const encodedGroupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
  const decodedGroupId = decodeGroupId(encodedGroupId);


  const removeUserFromCurrentGroup = () => {
    extendedSocket.emit('removeUserFromCurrentGroup', {
        groupId: decodedGroupId,
        accessToken: Cookies.get('accessToken'),
    });
}

  const leaveGroup = () => {
    removeUserFromCurrentGroup();
    extendedSocket.hasEmittedNewUser = false;
    router.push('/profilePage');
  }

  return (
    <div className={`${styles.TopSection} ${colorMode === 1 ? styles.TopSectionLight : styles.TopSectionDark}`}>
      <SearchSection />
      <GroupChat />
      <button onClick={() => dispatch(toggleMode())} className={`${colorMode === 1 ? styles.toggleModeLight : styles.toggleModeDark}`}>
        <Image src={colorMode === 1 ? ToDark : ToLight} alt='toggle mode' />
      </button>

      <button className={styles.logoutBtn} onClick={leaveGroup}>
        <span>Leave</span>
      </button>
    </div>
  )
}

export default TopSection