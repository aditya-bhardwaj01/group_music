import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'

export const JoinGroupButton = () => {
  return (
    <div className={styles.JoinGroupButton}>
      <Link href="/joinGroup" className={styles.joinGroupBtn}>
        JOIN GROUP
      </Link>
    </div>
  )
}
