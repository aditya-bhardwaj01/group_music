import React, { useEffect, useRef, useState } from 'react'
import styles from './ResetFirst.module.css'
import axios from 'axios';
import { FormError } from '@/components/FormError/page';
import { backendBaseURL } from '@/backendBaseURL';

type ResetFirstProp = {
  setLoginAction: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setActiveSection: React.Dispatch<React.SetStateAction<number>>;
};

const ResetFirst: React.FC<ResetFirstProp> = ({ setLoginAction, setEmail, setActiveSection }) => {
  const [sending, setSending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        checkForUniqueEmail();
      }
    };

    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  const checkForUniqueEmail = () => {
    setSending(true);
    const emailInp = document.getElementById('reset-email') as HTMLInputElement;
    const email = emailInp.value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const validEmail = emailRegex.test(email)
    if (!validEmail) {
      setSending(false);
      setErrorMsg('Please give a valid email address.');
      return;
    } else {
      setErrorMsg('');
    }

    axios.post(`${backendBaseURL}/users/verifyEmail`, {
      email: email
    })
      .then((response) => {
        if (!response.data) {
          setErrorMsg('');
          sendOtp(email);
        }
        else {
          setSending(false);
          setErrorMsg("We can't find an account with this email.");
        }
      })
      .catch((error) => {
        setSending(false);
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

  const sendOtp = (email: string) => {
    axios.post(`${backendBaseURL}/users/verifyOtp/send`, {
      process: 'login',
      email: email
    })
      .then((response) => {
        setSending(false);
        setEmail(email);
        setActiveSection(prev => prev + 1);
      })
      .catch((error) => {
        setSending(false);
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
    <div className={styles.ResetFirst}>
      <div className={styles.resetEmail}>
        E-mail <br />
        <input type="text" id='reset-email' ref={emailRef} />
      </div>

      <div className="resetBtnsSection">
        <button
          className={`${styles.resetBtns} btn btn-primary btn-sm mr-300`}
          disabled={sending}
          onClick={() => setLoginAction(true)}
        >
          Back
        </button>
        &nbsp;
        <button
          className={`${styles.resetBtns} btn btn-success btn-sm`}
          disabled={sending}
          onClick={checkForUniqueEmail}
        >
          Send OTP
        </button>
      </div>

      {errorMsg !== '' && <FormError errorMsg={errorMsg} />}
    </div>
  )
}

export default ResetFirst
