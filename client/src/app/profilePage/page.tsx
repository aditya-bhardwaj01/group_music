'use client'; // Ensure client-side execution

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ProfilePage = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const retrievedAccessToken = Cookies.get('accessToken');
    setAccessToken(retrievedAccessToken);

    Cookies.remove('accessToken');
    const expiresInOneMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    if(retrievedAccessToken) Cookies.set('accessToken', retrievedAccessToken, { expires: expiresInOneMonth });

  }, []);

  useEffect(() => {
    const retrievedAccessToken = Cookies.get('accessToken');
    if (!retrievedAccessToken) {
      router.push('/login');
    }
  }, [accessToken])

  const logOut = () => {
    setAccessToken(undefined);
    Cookies.remove('accessToken');
  };

  return (
    <div>
      ProfilePage
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default ProfilePage;