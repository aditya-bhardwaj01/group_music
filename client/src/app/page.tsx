"use client"
import { Navbar } from "@/components/Navbar/page";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "./page.module.css";
import Image from "next/image";
import ThemeImage from '../assets/themePhoto.png'
import TypingEffect from "@/components/TypingEffect/page";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const phrases = ['Crafting melodies together, echoing harmony',
    'Harmonize your playlist, synchronize your beats',
    'Amplifying togetherness, one song at a time',
    'Harmonizing souls through shared playlists']

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if(accessToken) router.push('/profilePage');
  }, [])

  return (
    <div className={styles.Home}>
      <Navbar />
      <div className={`${styles.mainHome} row flex-row-reverse`}>
        <div className={`${styles.homeRight} col-md-6`}>
          <Image src={ThemeImage} alt="Theme Picture"></Image>
          <TypingEffect phrases={phrases} />
        </div>

        <div className={`${styles.homeLeft} col-md-6`}>
          <p className={styles.welcomeMsg}>Welcome to <span>Melody Mingle</span>.</p>
          <input type="text" placeholder="Enter the group code" />
          <input type="text" placeholder="Enter your display name" />
          {/* <button>JOIN THE GROUP</button> */}
            <Link href="/profilePage" className={styles.joinBtn}>
              JOIN THE GROUP
            </Link>
        </div>
      </div>
    </div>
  );
}
