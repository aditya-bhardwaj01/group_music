"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import styles from './page.module.css'
import { FormLeft } from '@/components/FormLeft/page'
import { LoginForm } from './LoginForm/LoginForm'
import { Carousel } from '@/components/Carousel/page'
import ResetFirst from './ResetFirst/ResetFirst'
import { OTPVerification } from '@/components/OTPVerification/OTPVerification'
import { PasswordSetup } from '@/components/PasswordSetup/PasswordSetup'

const SignUp = () => {
  const router = useRouter();
  const first = "Welcome!";
  const second = "Log in to your account.";
  const third = "Explore all the features of our platform";
  const forth = "Connect with friends, discover new content, and personalize your experience.";

  const [loginAction, setLoginAction] = useState(true);
  const [passwordReset, setPasswordReset] = useState(false);
  const totalSection = 3;
  const [email, setEmail] = useState('');
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if(accessToken){
      Swal.fire("Logout to sign-in to another account!");
      router.push('/profilePage');
    }
  }, [])

  if(passwordReset){
    Swal.fire("You password has been updated successfully!");
    setPasswordReset(false);
    setActiveSection(0);
  }

  const goBack = () => {
    router.push('/');
  }

  const forms = [
    <ResetFirst setEmail={setEmail} setLoginAction={setLoginAction} setActiveSection={setActiveSection} />,
    <OTPVerification setActiveSection={setActiveSection} email={email} />,
    <PasswordSetup email={email} setActiveSection={setActiveSection} setLoginAction={setLoginAction} setPasswordReset={setPasswordReset} />
  ]

  return (
    <div className={styles.login}>
      <div className={styles.loginPage}>
        <div className={`${styles.loginContent} row`}>
          <div className={`${styles.desktopLeft} col-sm-7`}>
            <FormLeft first={first} second={second} third={third} forth={forth} />
          </div>
          <div className={`${styles.desktopRight} col-sm-5`}>
            <div className={styles.phoneGoBack} onClick={goBack}>&#x2716;</div>
            <p>{loginAction ? 'Log in' : 'Reset Password'}</p>
            {
            loginAction ? 
            <LoginForm setLoginAction={setLoginAction} /> 
            : 
            <div>
              {forms[activeSection]}
            </div>
            }
            {!loginAction && <Carousel totalSection={totalSection} activeSection={activeSection} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
