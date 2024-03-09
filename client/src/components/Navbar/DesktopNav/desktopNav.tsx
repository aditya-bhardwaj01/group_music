import React from 'react'
import styles from './desktopNav.module.css'
import { LoginButton } from '@/components/LoginButton/page'
import { SignupButton } from '@/components/SignupButton/page'
import { JoinGroupButton } from '@/components/JoinGroupButton/page'

export const DesktopNav = () => {
    return (
        <div>
            <div className={styles.desktopNav}>
                <div className={styles.desktopNavLeft}>
                    <JoinGroupButton />
                </div>
                <div className={styles.desktopNavRight}>
                    <LoginButton />
                    <SignupButton />
                </div>

                {/* <JoinGroupButton />
                <LoginButton />
                <SignupButton /> */}
            </div>
        </div>
    )
}
