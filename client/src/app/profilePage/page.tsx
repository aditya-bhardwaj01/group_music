'use client'; // Ensure client-side execution

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import styles from './page.module.css';

import ThemePhoto from '../../assets/themePhoto.png'
import MenuItem from './MenuItem/MenuItem';
import ProfileHome from './Home/ProfileHome';
import OwnerGroup from './OwnerGroup/OwnerGroup';
import MemberGroup from './MemberGroup/MemberGroup';

const ProfilePage = () => {
  const activeSection = useSelector((state: RootState) => state.applicationState.profilePageActive);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const retrievedAccessToken = Cookies.get('accessToken');
    setAccessToken(retrievedAccessToken);

    Cookies.remove('accessToken');
    const expiresInOneMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    if (retrievedAccessToken) Cookies.set('accessToken', retrievedAccessToken, { expires: expiresInOneMonth });

  }, []);

  useEffect(() => {
    const retrievedAccessToken = Cookies.get('accessToken');
    if (!retrievedAccessToken) {
      router.push('/login');
    }
  }, [accessToken])

  const sections = [<ProfileHome />, <OwnerGroup />, <MemberGroup />];

  return (
    <div
      className={styles.ProfilePage}>
      <div className={styles.mainSection}>
        <div className={styles.navIcon}>
          <a href="">
            <Image src={ThemePhoto} alt='Theme Photo'></Image>
          </a>
        </div>
        <hr className={styles.horizontalLine} />
        
        <div className={styles.contentSection}>
          {sections[activeSection]}
        </div>

        <div className={styles.menuItemSection}>
          <MenuItem setAccessToken={setAccessToken} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;