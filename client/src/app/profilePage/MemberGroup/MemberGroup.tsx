import React, { ChangeEvent, useEffect, useState } from 'react'
import SearchIcon from '../../../assets/search.png'
import DefaultImage from '../../../assets/DefaultCardImg.jpg';
import Image from 'next/image';
import Card from '../Card/Card';
import { FormError } from '@/components/FormError/page';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Loading } from '@/components/Loading/Loading';
import NoGroup from '../NoGroup/NoGroup';
import { backendBaseURL } from '@/backendBaseURL';

import styles from './MemberGroup.module.css'

interface GroupSingle {
  dateCreated: string;
  displayName: string;
  groupName: string;
  groupSecretCode: string;
  id: number;
  ownerId: number;
  songImage: string;
  songName: string;
}

const MemberGroup = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<GroupSingle[]>([]);
  const [originalGroupData, setOriginalGroupData] = useState<GroupSingle[]>([]);

  useEffect(() => {
    setLoading(true);
    axios.post(`${backendBaseURL}/listGroups/member`, {
      accessToken: Cookies.get('accessToken')
    })
      .then((response) => {
        const updatedGroups = response.data.map((group: GroupSingle) => ({
          ...group,
          songImage: group.songImage || DefaultImage,
          songName: group.songName || 'Play you first song'
        }));
        setGroups(updatedGroups);
        setOriginalGroupData(updatedGroups);
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
  }, []);

  const searchGroup = (event: ChangeEvent<HTMLInputElement>) => {
    const currText = event.target.value.trim();
    console.log(currText)
    setGroups(originalGroupData.filter(item => item.groupName.includes(currText)));
  }

  if (errorMsg !== '') return <div style={{ textAlign: 'center' }}><FormError errorMsg={errorMsg} /></div>
  if (originalGroupData.length === 0 && !loading) return <NoGroup groupType={'member'} />


  return (
    <div className={styles.MemberGroup}>
      <div className={styles.mainContent}>
        {loading ?
          <Loading height={70} width={70} /> :
          <div>
            <div className={styles.searchBox}>
              <span>
                <Image src={SearchIcon} height={20} width={20} alt='Search Icon'></Image>
              </span>
              <input type="text" placeholder='Search Your Group' onChange={searchGroup} />
            </div>
            {groups.length === 0 && <div style={{ color: 'gray', textAlign: 'center' }}>
              No matching results...
            </div>}
            <div className={styles.gridContainer}>
              {groups.map((data, index) => (
                <Card key={index} groupData={data} />
              ))}
            </div>
          </div>}
      </div>
    </div>
  )
}

export default MemberGroup
