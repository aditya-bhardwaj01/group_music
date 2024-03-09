import React, { useEffect } from 'react'
import styles from './phoneMenu.module.css'
import Link from 'next/link'

export const PhoneMenu = () => {
  return (
    <div id='PhoneMenu' className={styles.PhoneMenu}>
      {/* <div className={styles.borderDiv}></div> */}
      <div className={styles.joinGroupPhone}>
        {/* <button className={styles.joinGroupPhoneBtn}>JOIN GROUP</button> */}
        <Link href="/joinGroup" className={styles.joinGroupPhoneBtn}>
          JOIN GROUP
        </Link>
      </div>

      {/* <hr style={{ backgroundColor: 'white', margin: '10px 0', height: '1px' }} /> */}

      <div className={styles.loginPhone}>
        <Link href="/login" className={styles.loginPhoneBtn}>
          LOGIN
        </Link>
      </div>
      <div className={styles.signupPhone}>
        <Link href="/signup" className={styles.signupPhoneBtn}>
          SIGN UP FREE
        </Link>
      </div>
    </div>
  )
}
