import React from 'react'
import styles from './ProfileHome.module.css'
import Image from 'next/image'
import JoinGroup from '../JoinGroup/JoinGroup'
import CreateGroup from '../CreateGroup/CreateGroup'
// import profileHome from '../../../assets/profileHome.jpg'

const ProfileHome = () => {
  return (
    <div className={styles.ProfileHome}>
      <div className={styles.mainContent}>
        <div className={styles.message}>
          <h1>Welcome!</h1>
          <h2>Get ready to mingle with melodies</h2>
          <h6>Immerse yourself in the ultimate music journey. Let's groove together!</h6>
        </div>

        <div className={styles.buttons}>
          <span><JoinGroup /></span>
          <span><CreateGroup /></span>
        </div>
      </div>
    </div>
  )
}

export default ProfileHome
