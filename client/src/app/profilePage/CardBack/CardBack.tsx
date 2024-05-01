import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { FormError } from '@/components/FormError/page';
import { Loading } from '@/components/Loading/Loading';
import Image from 'next/image';
import playMusic from '../../../assets/playMusic.png';
import moveToTop from '../../../assets/moveToTop.png';
import moveToBottom from '../../../assets/moveToBottom.png';
import CopyIcon from '../../../assets/copyIcon.png';
import { useRouter } from 'next/navigation';

import styles from './CardBack.module.css'

interface CardProps {
  dateCreated: string;
  displayName: string;
  groupName: string;
  groupSecretCode: string;
  id: number;
  ownerId: number;
  songImage: string;
  songName: string;
}

interface CardBackProps {
  groupData: CardProps;
  setShowFront: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardBack: React.FC<CardBackProps> = ({ groupData, setShowFront }) => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showDate, setShowDate] = useState(false);
  const [onTop, setOnTop] = useState(false);
  const [members, setMembers] = useState([]);
  const router = useRouter();

  const getFormattedDate = (inputDateString: string) => {
    const date = new Date(inputDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return formattedDateTime;
  }

  const scrollBottobSec = () => {
    const targetDiv = document.getElementById(`bottomContent${groupData.id}`) as HTMLElement | null;
    if (targetDiv) {
      if (onTop) targetDiv.style.height = '50px';
      else targetDiv.style.height = '70px';
      setOnTop(prev => !prev);
      setShowDate(prev => !prev);
    } else {
      console.error("Element with class '.bottomContent' not found.");
    }
  }

  const copyToClipboardLegacy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  const copyToClipBoard = () => {
    if (!navigator.clipboard) {
      return copyToClipboardLegacy(groupData.groupSecretCode);
    }

    navigator.clipboard.writeText(groupData.groupSecretCode);
  }

  useEffect(() => {
    setLoading(true);
    axios.post('http://localhost:3001/listGroups/singleGroup', {
      groupId: groupData.id,
      accessToken: Cookies.get('accessToken'),
    })
      .then((response) => {
        setMembers(response.data);
        setLoading(false);
        setErrorMsg("");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          if (error.response.status === 404) {
            setErrorMsg("The resource you are trying to access doesn't exist.");
          }
          if (error.response.status === 500) {
            setErrorMsg("There is a issue on server side. Please try after sometime.");
          }
        } else if (error.request) {
          setErrorMsg("Network error encountered.");
        } else {
          setErrorMsg(error.message);
        }
      })
  }, [])

  if (errorMsg !== '' && !loading) return <div style={{ textAlign: 'center', flexDirection: 'column' }}>
    <button className={styles.backBtn} onClick={() => setShowFront(true)}>
      <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
      <span>Back</span>
    </button> <br />
    <FormError errorMsg={errorMsg} />
  </div>

  return (
    <div className={styles.CardBack}>
      {
        loading ?
          <Loading height={50} width={50} />
          :
          <div className={styles.mainContent}>
            <div className={styles.topContent}>
              <h4>{groupData.groupName}</h4>
              <div className={styles.topMainContent}>
                <div style={{ width: '220px', height: '180px' }}>
                  <p>
                    <div><b>Secret Code:</b></div>
                    <div>
                      {groupData.groupSecretCode}
                      <span className={styles.CopyIcon} onClick={copyToClipBoard}>
                        <Image src={CopyIcon} height={18} width={18} alt='Copy' />
                      </span>
                    </div>
                  </p>

                  <p>
                    <div><b>Admin:</b></div>
                    <div style={{ fontSize: '14px' }}>{groupData.displayName}</div>
                  </p>
                  <div className={styles.backCardBtn}>
                    <button className={styles.backBtn} onClick={() => setShowFront(true)}>
                      <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
                      <span>Back</span>
                    </button>
                    <button onClick={() => router.push('/groupMusic/' + groupData.groupName)} className={styles.joinBtn}>
                      Join
                      <div className={styles.arrowWrapper}>
                        <div className={styles.arrow}></div>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <div className={styles.members}>
                    <b>Members:</b>
                    {members.length === 0 &&
                      <p style={{ fontSize: '10px' }}>No one in this group!</p>}
                    <div className={styles.membersList}>
                      {members.map((item: any, index) => (
                        <div key={index} className={styles.singleMember}>
                          <span className={`${styles.circle} ${item.status ? styles.circle1 : styles.circle0}`}></span>
                          &nbsp; {item.displayName}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.bottomCotent} id={`bottomContent${groupData.id}`}>
              <Image src={groupData.songImage} height={40} width={40} alt="SongImage" />
              <div className={styles.groupNameDate}>
                <div>{groupData.groupName}</div>
                <div>
                  {groupData.songName !== "Play you first song" &&
                    <Image src={playMusic} height={16} width={16} alt='Song-played' />}
                  <span style={{ padding: '0 3px' }}>{groupData.songName}</span>
                </div>
                {showDate && <div>Created on {getFormattedDate(groupData.dateCreated)}</div>}
              </div>

              <div className={styles.scrollBottom} onClick={scrollBottobSec}>
                <Image src={onTop ? moveToBottom : moveToTop} alt='Scroll' />
              </div>
            </div>
          </div>
      }
    </div>
  )
}

export default CardBack