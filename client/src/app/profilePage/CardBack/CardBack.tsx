import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { FormError } from '@/components/FormError/page';
import { Loading } from '@/components/Loading/Loading';
import Image from 'next/image';
import playMusic from '../../../assets/playMusic.png';
import moveToTop from '../../../assets/moveToTop.png';
import moveToBottom from '../../../assets/moveToBottom.png';

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
    console.log(targetDiv)
    if (targetDiv) {
        if(onTop) targetDiv.style.height = '50px';
        else targetDiv.style.height = '70px';
        setOnTop(prev => !prev);
        setShowDate(prev => !prev);
    } else {
        console.error("Element with class '.bottomContent' not found.");
    }
  }

  useEffect(() => {
    setLoading(true);
    axios.post('http://localhost:3001/listGroups/singleGroup', {
      groupId: groupData.id,
      accessToken: Cookies.get('accessToken'),
    })
      .then((response) => {
        console.log(response.data);
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
    <button onClick={() => setShowFront(true)}>CardBack</button> <br />
    <FormError errorMsg={errorMsg} />
  </div>

  return (
    <div className={styles.CardBack}>
      {
        loading ?
          <Loading height={50} width={50} />
          :
          <div className={styles.mainContent}>
            <button onClick={() => setShowFront(true)}>CardBack</button>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio laborum beatae in quod rerum ea, itaque libero a sequi reprehenderit,
              pariatur blanditiis magni consequuntur, obcaecati nesciunt perferendis. Omnis, perspiciatis ea!
            </p>

            <div className={styles.bottomCotent} id={`bottomContent${groupData.id}`}>
              <Image src={groupData.songImage} height={40} width={40} alt="SongImage" />
              <div className={styles.groupNameDate}>
                <div>{groupData.groupName}</div>
                <div>
                  <Image src={playMusic} height={12} width={12} alt='Song-played' />  
                  <span style={{padding: '0 5px'}}>{groupData.songName}</span>
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