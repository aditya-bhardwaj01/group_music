import React from 'react'
import Image from 'next/image'
import ThemePhoto from '../../assets/themePhoto.png'
import { useRouter } from 'next/navigation'

import styles from './page.module.css'

type FormLeftProp = {
    first: string;
    second: string;
    third: string;
    forth: string;
};

export const FormLeft: React.FC<FormLeftProp> = ({first, second, third, forth}) =>  {
    const router = useRouter();
    const goBack = () => {
        router.push('/')
    }

    return (
        <div className={styles.FormRight}>
            <div className={styles.formRightUp}>
                <a href="">
                    <Image src={ThemePhoto} alt='Theme-photo'></Image>
                </a>
            </div>

            <div className={styles.formLeftDown}>
                <div className={styles.downFirst}>{first}</div>
                <div className={styles.downSecond}>{second}</div>
                <div className={styles.downThird}>{third}</div>
                <div className={styles.downForth}>{forth}</div>
                <div className={styles.goBackBtn}>
                    <button onClick={goBack}>Go back</button>
                </div>
            </div>
        </div>
    )
}
