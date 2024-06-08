"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FormError } from '@/components/FormError/page';
import { Loading } from '@/components/Loading/Loading';
import MainGroupMusic from '../MainGroupMusic/MainGroupMusic';
import { setGroupName, setGroupId, setDisplayName } from '@/store/slices/applicationState';
import { useDispatch } from 'react-redux';

import styles from './page.module.css';
import { decodeGroupId } from '@/app/utils';

export default function GroupMusic({ params }: { params: { groupName: string } }) {
    const dispatch = useDispatch();
    const CLIENT_ID = "607554faa3ca4077ad2713a169843a17";
    const CLIENT_SECRET = "34adba9b9fba4b98a0c4eaae9e4d92dd";
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const lastDashIndex = params.groupName.lastIndexOf('-');
    const groupName = decodeURIComponent(params.groupName.substring(0, lastDashIndex));
    const encodedId = decodeURIComponent(params.groupName.substring(lastDashIndex + 1));
    const decodedGroupId = decodeGroupId(encodedId);
    dispatch(setGroupName(groupName));
    dispatch(setGroupId(encodedId));

    useEffect(() => {
        const retrievedAccessToken = Cookies.get('accessToken');
        if (!retrievedAccessToken) {
            router.push('/login');
        }
    }, [])

    useEffect(() => {
        setLoading(true);
        axios.post('http://localhost:3001/groupMusic/isAuthentic', {
            groupId: decodedGroupId,
            groupName: groupName,
            accessToken: Cookies.get('accessToken'),
        })
            .then((response) => {
                if (response.data.isAuthentic === false) {
                    Swal.fire("Alas! You don't belong to this group!");
                    router.push('/profilePage');
                }
                setIsAuthenticated(response.data.isAuthentic === true);
                setLoading(false);
                setErrorMsg("");
                setDisplayName(response.data.displayName);
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

    if (errorMsg !== '' && !loading) return <div className={styles.groupMusic}><FormError errorMsg={errorMsg} /></div>
    if (isAuthenticated && !loading) return <MainGroupMusic clientId={CLIENT_ID} clientSecret={CLIENT_SECRET} />;
    return <div>
        {loading && <div className={styles.groupMusic}><Loading height={70} width={70} /></div>}
    </div>
}