import React, { ChangeEvent, useState } from 'react'
import axios from 'axios';
import { FormError } from '@/components/FormError/page';
import Cookies from 'js-cookie';

import styles from './CreateForm.module.css';

export const CreateForm = () => {
    const [disabled, setDisabled] = useState(true);
    const [groupName, setGroupName] = useState('');
    const [validGroup, setValidGroup] = useState(false);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");

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
        axios.post('http://localhost:3001/groupManagement/create', {
            groupName: groupName,
            displayName: name,
            accessToken: Cookies.get('accessToken')
        })
            .then((response) => {
                setErrorMsg("")
            })
            .catch((error) => {
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

    return (
        <div className={styles.CreateForm}>
            <input type="text" placeholder='Group Name' id="group-name" onChange={groupNameChange} />
            <input type="text" placeholder='Display Name' id="display-name" onChange={nameChange} />
            <button className={`${disabled ? styles.btnDisabled : styles.btnEnabled}`} disabled={disabled} onClick={createGroup}>
                Create
            </button>

            {errorMsg != "" && <FormError errorMsg={errorMsg} />}
        </div>
    )
}
