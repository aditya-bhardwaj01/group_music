"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FormError } from '@/components/FormError/page';
import { Loading } from '@/components/Loading/Loading';
import MainGroupMusic from '../MainGroupMusic/MainGroupMusic';
// import { RootState } from '@/store/store';
// import { useDispatch, useSelector } from 'react-redux';
// import { toggleMode } from '@/store/slices/applicationState';

import styles from './page.module.css';

export default function GroupMusic({ params }: { params: { groupName: string } }) {
    // const colorMode = useSelector((state: RootState) => state.applicationState.theme);
    const CLIENT_ID = "27c26d77c4524d65b42b2c069eda617d";
    const CLIENT_SECRET = "7d97841f94de4a06b820fa98fa0d7364";
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.post('http://localhost:3001/groupMusic/isAuthentic', {
            groupName: params.groupName,
            accessToken: Cookies.get('accessToken'),
        })
            .then((response) => {
                if(response.data.isAuthentic === 0) {
                    Swal.fire("Alas! You don't belong to this group!");
                    router.push('/profilePage');
                }
                setIsAuthenticated(response.data.isAuthentic === 1)
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

    if (errorMsg !== '' && !loading) return <div className={styles.groupMusic}><FormError errorMsg={errorMsg} /></div>
    if(isAuthenticated && !loading) return <MainGroupMusic clientId={CLIENT_ID} clientSecret={CLIENT_SECRET} />;
    return <div>
        {loading && <div className={styles.groupMusic}><Loading height={70} width={70} /></div>}
    </div>
}