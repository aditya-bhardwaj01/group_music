import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

export const SignupButton = () => {
  return (
    <div className={styles.SignupButton}>
      <Link href="/signup" className={styles.signupBtn}>
        SIGN UP FREE
      </Link>
    </div>
  )
}
