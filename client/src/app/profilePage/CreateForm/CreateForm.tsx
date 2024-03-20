import React, { ChangeEvent, useState } from 'react'
import axios from 'axios';
import { FormError } from '@/components/FormError/page';
import Cookies from 'js-cookie';
import Image from 'next/image';

import Loading from '../../../assets/loading.gif';
import CopyIcon from '../../../assets/copyIcon.png';
import styles from './CreateForm.module.css';

export const CreateForm = () => {
    const [disabled, setDisabled] = useState(true);
    const [groupName, setGroupName] = useState('');
    const [validGroup, setValidGroup] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const [secretCode, setSecretCode] = useState("");
    const [loading, setLoading] = useState(false);

    const groupNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const currGroupName = event.target.value;
        setGroupName(currGroupName);

        const regex = /\S/;
        const groupNameValidity = (regex.test(currGroupName) && currGroupName.length > 0);
        setValidGroup(groupNameValidity);

        setDisabled(!(groupNameValidity && validName));
    }

    const nameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const currName = event.target.value;
        setName(currName);

        const regex = /\S/;
        const nameValidity = (regex.test(currName) && currName.length > 0);
        setValidName(nameValidity);

        setDisabled(!(nameValidity && validGroup));
    }

    const createGroup = () => {
        setLoading(true);
        axios.post('http://localhost:3001/groupManagement/create', {
            groupName: groupName.trim(),
            displayName: name.trim(),
            accessToken: Cookies.get('accessToken')
        })
            .then((response) => {
                setLoading(false);
                setErrorMsg("")
                setSecretCode(response.data.secretCode);
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
    }

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(secretCode);
    }

    return (
        <div className={styles.CreateForm}>
            <input type="text" placeholder='Group Name' id="group-name" onChange={groupNameChange} />
            <input type="text" placeholder='Display Name' id="display-name" onChange={nameChange} />
            <button className={`${disabled ? styles.btnDisabled : styles.btnEnabled}`} disabled={disabled || loading} onClick={createGroup}>
                {loading ? <Image src={Loading} alt='loading' height={20} width={20} /> : 'Create'}
            </button>
            {secretCode !== "" &&
                <div className={styles.secretCode}>
                    <div className={styles.codeText}>{secretCode}</div>
                    <div className={styles.codeCopy} onClick={copyToClipBoard}>
                        <Image src={CopyIcon} height={20} width={17} alt='copy' />
                    </div>
                </div>}
            {errorMsg != "" && <FormError errorMsg={errorMsg} />}
        </div>
    )
}
