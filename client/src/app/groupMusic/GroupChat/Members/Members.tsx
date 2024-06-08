import React, { useEffect, useState } from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Cookies from "js-cookie";
import axios from 'axios';
import { decodeGroupId, getColorHexValue, getImageLetters } from '../../../utils';
import Image from 'next/image';

import styles from './Members.module.css'

const Members = () => {
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);
    const encodedGroupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
    const displayName = useSelector((state: RootState) => state.applicationState.displayName);
    const groupId = decodeGroupId(encodedGroupId.toString());

    useEffect(() => {
        setLoading(true);
        axios.post('http://localhost:3001/listGroups/singleGroup', {
            // // // // // // check for displayname in chat window
            groupId: groupId,
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

    return (
        <div className={`${styles.Members} ${colorMode === 1 ? styles.MembersLight : styles.MembersDark}`}>
            <div className={styles.singleMember}>
                <div className={styles.profileImage} style={{ backgroundColor: getColorHexValue() }}>
                    {getImageLetters(displayName)}
                </div>
                <div className={styles.memberName}>{displayName}</div>
            </div>

            {members.map((member: any, index: number) => {
                return <div className={styles.singleMember}>
                    <div className={styles.profileImage} style={{ backgroundColor: getColorHexValue() }}>
                        {getImageLetters(member.displayName)}
                    </div>
                    <div className={styles.memberName}>{member.displayName}</div>
                </div>
            })}
        </div>
    )
}

export default Members;