"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Logo from '../../assets/Logooo.png';
import styles from './page.module.css';
import { DesktopNav } from './DesktopNav/desktopNav';
import { PhoneNav } from './PhoneNav/phoneNav';
import { PhoneMenu } from './PhoneMenu/phoneMenu';

export const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(0);

  const [collapseMenu, setCollapseMenu] = useState(true);

  const updateWindowWidth = () => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 730) {
        setCollapseMenu(true);
      }
    }
  };

  useEffect(() => {
    updateWindowWidth(); 
    window.addEventListener('resize', updateWindowWidth);
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  return (
    <div className={styles.Navbar}>
      <div className={styles.mainNav}>
        <div className={styles.logoSection}>
          <a href=""><Image src={Logo} className={styles.navbarLogo} alt='Logo' /></a>
        </div>
        {windowWidth >= 730 ? (
          <div className={styles.menuSectionDesktop}>
            <DesktopNav />
          </div>
        ) : (
          <div className={styles.toggleMenu}>
            <PhoneNav collapseMenu={collapseMenu} setCollapseMenu={setCollapseMenu} />
          </div>
        )}
      </div>
      {!collapseMenu && windowWidth < 730 && (
        <div className={styles.phoneMenu}>
          <PhoneMenu />
        </div>
      )}
    </div>
  );
};
