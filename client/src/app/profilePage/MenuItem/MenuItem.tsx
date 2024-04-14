import React from 'react'
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setProfilePageActive } from '@/store/slices/applicationState';
import Cookies from 'js-cookie';

import Image from 'next/image';
import Home from '../../../assets/menuLogo/home.png';
import Owner from '../../../assets/menuLogo/owner.png';
import Member from '../../../assets/menuLogo/member.png';
import Logout from '../../../assets/menuLogo/logout.png';

import styles from './MenuItem.module.css'

type MenuItemProps = {
    setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const MenuItem: React.FC<MenuItemProps> = ({ setAccessToken }) => {
    const active = useSelector((state: RootState) => state.applicationState.profilePageActive);
    const dispatch = useDispatch();

    const icons = [Home, Owner, Member];

    const logOut = () => {
        setAccessToken(undefined);
        dispatch(setProfilePageActive(0))
        Cookies.remove('accessToken');
    };

    return (
        <div className={styles.MenuItem}>
            {icons.map((item, key) => {
                return <div key={key} className={`${styles.menuSingle} ${key === active && styles.activeTab} ${styles.transitionClass}`}
                                      onClick={() => dispatch(setProfilePageActive(key))}>
                    <Image className={styles.logoImg} src={item} alt='Home-Icon'></Image>
                </div>
            })}


            <div className={`${styles.menuSingle} ${styles.transitionClass}`}
                 onClick={logOut}>
                <Image className={styles.logoImg} src={Logout} alt='Home-Icon'></Image>
            </div>
        </div>
    )
}

export default MenuItem