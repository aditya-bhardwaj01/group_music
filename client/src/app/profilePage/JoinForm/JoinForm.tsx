import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Loading from '../../../assets/loading.gif';
import { FormError } from '@/components/FormError/page';
import axios from 'axios';
import Cookies from 'js-cookie';
import { encodeGroupId } from '@/app/utils';

import styles from './JoinForm.module.css';

export const JoinForm = () => {
  const [disabled, setDisabled] = useState(true);
  const [code, setCode] = useState('');
  const [validCode, setValidCode] = useState(false);

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const codeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currCode = event.target.value;
    setCode(currCode);

    const regex = /\S/;
    const codeValidity = (regex.test(currCode) && currCode.length > 0);
    setValidCode(codeValidity);

    setDisabled(!(codeValidity && validName));
  }

  const nameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currName = event.target.value;
    setName(currName);

    const regex = /\S/;
    const nameValidity = (regex.test(currName) && currName.length > 0);
    setValidName(nameValidity);

    setDisabled(!(nameValidity && validCode));
  }

  const joinGroup = () => {
    setLoading(true);
    axios.post('http://localhost:3001/groupManagement/join', {
      secretCode: code.trim(),
      displayName: name.trim(),
      accessToken: Cookies.get('accessToken')
    })
      .then((response) => {
        setLoading(false);
        setErrorMsg("");
        router.push(`/groupMusic/${response.data.groupName}-${encodeGroupId(response.data.groupId)}`);
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          if (error.response.status === 400) {
            setErrorMsg(error.response.data.error);
          }
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
    <div className={styles.JoinForm}>
      <input type="text" placeholder='Secret Code' id="secret-code" onChange={codeChange} />
      <input type="text" placeholder='Display Name' id="display-name" onChange={nameChange} />

      <button className={`${disabled ? styles.btnDisabled : styles.btnEnabled}`} disabled={disabled || loading} onClick={joinGroup}>
        {loading ? <Image src={Loading} alt='loading' height={20} width={20} /> : 'Join'}
      </button>

      {errorMsg != "" && <FormError errorMsg={errorMsg} />}
    </div>
  )
}
