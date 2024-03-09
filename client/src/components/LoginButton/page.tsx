import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

export const LoginButton = () => {
  return (
    <div className={styles.LoginButton}>
      <Link href="/login" className={styles.loginBtn}>
        LOGIN
      </Link>
    </div>
  )
}
