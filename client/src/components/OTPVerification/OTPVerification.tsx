"use client"
import React, { useEffect, useRef, useState } from 'react'
import styles from './OTPVerification.module.css'
import axios from 'axios'
import { FormError } from '@/components/FormError/page';

type OTPVerificationProp = {
    setActiveSection: React.Dispatch<React.SetStateAction<number>>;
    email: string
};

export const OTPVerification: React.FC<OTPVerificationProp> = ({ setActiveSection, email }) => {
    const [errorMsg, setErrorMsg] = useState('');
    const [sending, setSending] = useState(false);
    const otpRef = useRef<HTMLInputElement>(null);

    const backClick = () => {
        setActiveSection(prevSection => prevSection - 1);
    }

    const verifyOtp = () => {
        const userInp = document.getElementById('user-otp') as HTMLInputElement;
        const userOTP = userInp.value;

        setSending(true);
        axios.post('http://localhost:3001/users/verifyOtp/verify', {
            email: email,
            otp: userOTP
        })
        .then((response) => {
            setSending(false);
            setActiveSection(prev => prev+1);
        })
        .catch((error) => {
            setSending(false);
            if (error.response) {
                if(error.response.status === 400){
                    setErrorMsg(error.response.data.error)
                }
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

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                verifyOtp();
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    return (
        <div className={styles.SecondForm}>
            <div className={styles.signUpOtp}>
                OTP <br />
                <input type="text" id='user-otp' ref={otpRef} />
            </div>
            <div className={styles.otpFormBtn}>
                <button onClick={backClick} className={`${styles.goBackBtn} btn btn-primary btn-sm`} disabled={sending}>
                    Back
                </button>
                &nbsp;
                <button 
                    onClick={verifyOtp} 
                    className={`${styles.verifyOtpBtn} btn btn-success btn-sm`} 
                    disabled={sending}>
                    Verify
                </button>
            </div>
            {errorMsg !== '' && <FormError errorMsg={errorMsg} />}
        </div>
    )
}
