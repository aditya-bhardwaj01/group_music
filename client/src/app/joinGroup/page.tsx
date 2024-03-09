"use client"
import React from 'react'
import styles from './page.module.css'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import SignUpImage from '../../assets/images/signup.jpg'

const JoinGroup = () => {
  const router = useRouter();
  const goBack = () => {
    router.push('/')
  }

  return (
    <div className={styles.signUp}>
      <div className={styles.signUpDesktop}>
        <div className={`${styles.signUpConten} row`}>
          <div className={`${styles.desktopLeft} col-sm-7`}>
            Left of desktop
          </div>
          <div className={`${styles.desktopRight} col-sm-5`}>
            Right of desktop
          </div>
        </div>
      </div>

      <div className={styles.signUpPhone}>
        <div className={styles.signUpContent}>
          Sign up Phone
        </div>
      </div>
    </div>
  )
}

export default JoinGroup
