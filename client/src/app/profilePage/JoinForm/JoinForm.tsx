import React, { ChangeEvent, useState } from 'react'
import styles from './JoinForm.module.css';

export const JoinForm = () => {
  const [disabled, setDisabled] = useState(true);
  const [code, setCode] = useState('');
  const [validCode, setValidCode] = useState(false);

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);

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
    console.log(code, name);
  }

  return (
    <div className={styles.JoinForm}>
      <input type="text" placeholder='Secret Code' id="secret-code" onChange={codeChange} />
      <input type="text" placeholder='Display Name' id="display-name" onChange={nameChange} />
      <button className={`${disabled ? styles.btnDisabled : styles.btnEnabled}`} disabled={disabled} onClick={joinGroup}>
        Join
      </button>
    </div>
  )
}
