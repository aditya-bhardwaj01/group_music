"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import ShowPassword from '../../assets/showPassword.png'
import HidePassword from '../../assets/hidePassword.png'
import styles from './PasswordSetup.module.css'
import { FormError } from '@/components/FormError/page'

type PasswordSetupProp = {
    setActiveSection: React.Dispatch<React.SetStateAction<number>>;
    setLoginAction?: React.Dispatch<React.SetStateAction<boolean>>;
    setPasswordReset?: React.Dispatch<React.SetStateAction<boolean>>;
    email: string;
    name?: string;
};

type dataType = {
    email: string;
    name?: string;
    password: string;
}

export const PasswordSetup: React.FC<PasswordSetupProp> = ({ setActiveSection, setLoginAction, setPasswordReset, email, name }) => {
    const router = useRouter();
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const [sending, setSending] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const backClick = () => {
        setActiveSection(prevSection => prevSection - 1);
    }

    const isValidPassword = (password: string) => {
        var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
        return regex.test(password);
    }

    const finalSignUp = () => {
        const passwordField = document.getElementById('password') as HTMLInputElement;
        const password = passwordField.value;

        const confirmPassField = document.getElementById('confirm-password') as HTMLInputElement;
        const conformPass = confirmPassField.value;
        if (password !== conformPass) {
            setErrorMsg("Passwords don't match.");
            return;
        } else {
            setErrorMsg("");
        }

        if (!isValidPassword(password)) {
            setErrorMsg("Passwords must contain at least one number, one special character, one alphabet, and should have a minimum length of 8 characters");
            return;
        } else {
            setErrorMsg("");
        }

        let url = "http://localhost:3001/users/resetPassword";
        let data: dataType = { email: email, password: password }

        if (name) {
            url = 'http://localhost:3001/users/signup';
            data = { email: email, name: name, password: password }
        }
        setSending(true);
        axios.post(url, data)
            .then((response) => {
                if (name) router.push('/login');
                else {
                    setLoginAction?.(true);
                    setPasswordReset?.(true);
                }
                setSending(false);
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

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                finalSignUp();
            }
        };

        document.addEventListener('keypress', handleKeyPress);

        return () => {
            document.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    return (
        <div className={styles.ThirdForm}>
            <div className={styles.signUpPassword}>
                Password <br />
                <input type={showPassword ? "text" : "password"}
                    className={styles.passwordInp} id='password' ref={passwordRef}
                    style={{ border: 'none' }} />
                <Image src={showPassword ? HidePassword : ShowPassword}
                    alt='toggle-password'
                    onClick={() => setShowPassword(prev => !prev)}
                    className={styles.passwordImage} />
            </div>

            <div className={styles.signUpPassword}>
                Confirm password <br />
                <input type={showConfirmPassword ? "text" : "password"}
                    className={styles.passwordInp} id='confirm-password' ref={confirmPasswordRef}
                    style={{ border: 'none' }} />
                <Image src={showConfirmPassword ? HidePassword : ShowPassword}
                    alt='toggle-password'
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    className={styles.passwordImage} />
            </div>
            <div className={styles.passwordFormBtn}>
                <button onClick={backClick} className={`${styles.goBackBtn} btn btn-primary btn-sm`} disabled={sending}>
                    Back
                </button>
                &nbsp;
                <button onClick={finalSignUp} className={`${styles.finalSignUpBtn} btn btn-success btn-sm`} disabled={sending}>
                    {name ? 'SIGN UP' : 'Reset'}
                </button>
            </div>

            {errorMsg !== '' && <FormError errorMsg={errorMsg} />}
        </div>
    )
}
