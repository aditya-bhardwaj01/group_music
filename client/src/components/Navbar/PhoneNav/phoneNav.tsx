import React, { useEffect } from 'react';
import styles from './phoneNav.module.css';
import ToggleMenu from '../../../assets/menutoggle.png';
import ClosePhoneMenu from '../../../assets/closeMenu.png';
import Image from 'next/image';

type PhoneNavProp = {
    collapseMenu: boolean;
    setCollapseMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PhoneNav: React.FC<PhoneNavProp> = ({ collapseMenu, setCollapseMenu }) => {
    const toggleShowMenu = () => {
        setCollapseMenu(prev => !prev);
    };

    useEffect(() => {
        const menuImage = document.getElementById('menuImage');
        if (menuImage) {
            menuImage.classList.add(styles.rotate);
            setTimeout(() => {
                menuImage.classList.remove(styles.rotate);
            }, 500);
        }
    }, [collapseMenu]);

    return (
        <div className={styles.PhoneNav} onClick={toggleShowMenu}>
            {collapseMenu ? (
                <Image
                    id="menuImage"
                    className={styles.openMenu}
                    src={ToggleMenu}
                    alt='Open-menu'
                />
            ) : (
                <Image
                    id="menuImage"
                    className={styles.closeMenu}
                    src={ClosePhoneMenu}
                    alt='Close-menu'
                />
            )}
        </div>
    );
};
