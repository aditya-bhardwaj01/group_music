"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { FormError } from '@/components/FormError/page';
import { backendBaseURL } from '@/backendBaseURL';

import styles from './FirstForm.module.css'

type FirstFormProp = {
    setActiveSection: React.Dispatch<React.SetStateAction<number>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setName: React.Dispatch<React.SetStateAction<string>>;
};

export const FirstForm: React.FC<FirstFormProp> = ({ setActiveSection, setEmail, setName }) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [sending, setSending] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const declarationRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const goToLogin = () => {
        router.push('/login')
    }

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            sendOtp();
          }
        };
    
        document.addEventListener('keypress', handleKeyPress);

        return () => {
          document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    const checkForUniqueEmail = async (email: string, name: string) => {
        setSending(true);
        axios.post(`${backendBaseURL}/users/verifyEmail`, {
            email: email
        })
        .then((response) => {
            if(!response.data){
                setSending(false);
                setErrorMsg('An account with this email id already exists');
            }
            else{
                setErrorMsg('');
                finalOtpSend(email, name);
            }
        })
        .catch((error) => {
            setSending(false);
            if (error.response) {
                if(error.response.status === 404){
                    setErrorMsg("The resource you are trying to access doesn't exist.");
                }
                if(error.response.status === 500){
                    setErrorMsg("There is a issue on server side. Please try after sometime.");
                }
              } else if (error.request) {
                setErrorMsg("Network error encountered.");
              } else {
                setErrorMsg(error.message);
              }
        })
    }

    const finalOtpSend = (email: string, name: string) => {
        axios.post(`${backendBaseURL}/users/verifyOtp/send`, {
            process: 'signup',
            email: email
        })
        .then((response) => {
            setSending(false);
            setEmail(email);
            setName(name);
            setActiveSection(prev => prev+1);
        })
        .catch((error) => {
            setSending(false);
            if (error.response) {
                if(error.response.status === 404){
                    setErrorMsg("The resource you are trying to access doesn't exist.");
                }
                if(error.response.status === 500){
                    setErrorMsg("There is a issue on server side. Please try after sometime.");
                }
              } else if (error.request) {
                setErrorMsg("Network error encountered.");
              } else {
                setErrorMsg(error.message);
              }
        })
    }

    const sendOtp = async () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const nameRegex = /\w/;

        const emailInp = document.getElementById('signup-email') as HTMLInputElement;
        const email = emailInp.value;

        const nameInp = document.getElementById('signup-name') as HTMLInputElement;
        const name = nameInp.value

        const declarationCheckbox = document.getElementById('declaration') as HTMLInputElement;

        if (declarationCheckbox) {
            const isChecked = declarationCheckbox.checked;
            if(!isChecked){
                setErrorMsg('Please agree to the declaration before proceeding with the sign-up process..')
                return;
            } else{
                setErrorMsg('')
            }
        }

        const validEmail = emailRegex.test(email)
        if(!validEmail){
            setErrorMsg('Please give a valid email address.');
            return;
        } else{
            setErrorMsg('');
        }

        const validName = nameRegex.test(name)
        if(!validName){
            setErrorMsg('Please provide your name.');
            return;
        }
        else{
            setErrorMsg('')
        }

        await checkForUniqueEmail(email, name);
    }

    return (
        <div className={styles.signUpForm}>
            <div className={styles.signUpEmail}>
                E-mail <br />
                <input type="text" id='signup-email' ref={emailRef} />
            </div>
            <div className={styles.signUpName}>
                Name <br />
                <input type="text" id='signup-name' ref={nameRef} />
            </div>
            <div className={styles.signUpDecl} id='signup-decl'>
                <input type="checkbox" id="declaration" name="declaration" ref={declarationRef} />
                <label htmlFor="declaration" style={{ color: 'white' }}>
                    I confirm that the details are correct.
                </label>
            </div>
            <div className={styles.signUpBtn}>
                <button className={`${styles.signUpOtp} ${sending && styles.btnDisabled}`} onClick={sendOtp} disabled={sending}>
                    <span style={{ marginRight: '10px' }}>Send OTP</span>
                </button>

                <span className={styles.signUpToLogin} onClick={goToLogin}>
                    Have an account?
                </span>
            </div>
            {errorMsg !== '' && <FormError errorMsg={errorMsg} />}
        </div>
    )
}
