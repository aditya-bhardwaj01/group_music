"use client"
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import ShowPassword from '../../../assets/showPassword.png';
import HidePassword from '../../../assets/hidePassword.png';
import styles from './LoginForm.module.css'
import { FormError } from '@/components/FormError/page';
import { backendBaseURL } from '@/backendBaseURL';

type LoginForProps = {
    setLoginAction: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginForm: React.FC<LoginForProps> = ({ setLoginAction }) => {
    const router = useRouter();
    const [sending, setSending] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                startLoginAction();
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    const validateUser = (email: string, password: string) => {
        axios.post(`${backendBaseURL}/users/login`, {
            email: email,
            password: password
        })
            .then((response) => {
                setSending(false);
                const oneMonthInMilliseconds = 30 * 24 * 60 * 60 * 1000; 
                const expiresInOneMonth = new Date(Date.now() + oneMonthInMilliseconds);
                Cookies.set('accessToken', response.data.accessToken, { expires: expiresInOneMonth });
                router.push('/profilePage');

            })
            .catch((error) => {
                setSending(false);
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

    const startLoginAction = () => {
        setSending(true);
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const emailInp = document.getElementById('login-email') as HTMLInputElement;
        const email = emailInp.value;

        const passwordInp = document.getElementById('login-password') as HTMLInputElement;
        const password = passwordInp.value;

        const validEmail = emailRegex.test(email)
        if (!validEmail) {
            setSending(false);
            setErrorMsg('Please give a valid email address.');
            return;
        } else {
            setErrorMsg('');
        }

        if (password === '') {
            setSending(false);
            setErrorMsg('Please enter the password.')
            return;
        } else {
            setErrorMsg('');
        }

        validateUser(email, password);
    }

    return (
        <div className={styles.LoginForm}>
            <div className={styles.loginEmail}>
                E-mail <br />
                <input type="text" id='login-email' ref={emailRef} />
            </div>
            <div className={styles.loginPassword}>
                Password <br />
                <input type={showPassword ? "text" : "password"}
                    className={styles.passwordInp} id='login-password' ref={passwordRef}
                    style={{ border: 'none' }} />
                <Image src={showPassword ? HidePassword : ShowPassword}
                    alt='toggle-password'
                    onClick={() => setShowPassword(prev => !prev)}
                    className={styles.passwordImage} />
            </div>

            <div className="loginBtnsSection">
                <button
                    className={`${styles.loginBtn} ${sending && styles.btnDisabled}`}
                    disabled={sending}
                    onClick={startLoginAction}
                >
                    Login
                </button>
                <br />
                <span className={styles.otherLink} onClick={() => setLoginAction(false)}>
                    Forgot password?
                </span>
                <br />
                <span className={styles.otherLink} onClick={() => router.push('/signup')}>
                    Create Account
                </span>
            </div>

            {errorMsg !== '' && <FormError errorMsg={errorMsg} />}
        </div>
    )
}
