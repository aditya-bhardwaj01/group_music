"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import styles from './page.module.css'
import { FirstForm } from './FirstForn/FirstForm'
import { FormLeft } from '@/components/FormLeft/page'
import { Carousel } from '@/components/Carousel/page'
import { OTPVerification } from '@/components/OTPVerification/OTPVerification'
import { PasswordSetup } from '@/components/PasswordSetup/PasswordSetup'

const SignUp = () => {
  const router = useRouter();
  const first = "Don't have an";
  const second = "account?";
  const third = "Register to enjoy all the features of this platform.";
  const forth = "Explore, listen, and connect with your friends. It's free!";
  const totalSection = 3;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if(accessToken){
      Swal.fire("Logout to create another account!");
      router.push('/profilePage');
    }
  }, [])

  const goBack = () => {
    router.push('/');
  }

  const forms = [
                  <FirstForm setActiveSection={setActiveSection} setEmail={setEmail} setName={setName} />, 
                  <OTPVerification setActiveSection={setActiveSection} email={email} />, 
                  <PasswordSetup setActiveSection={setActiveSection} email={email} name={name} />
                ]

  return (
    <div className={styles.signUp}>
      <div className={styles.signUpPage}>
        <div className={`${styles.signUpContent} row`}>
          <div className={`${styles.desktopLeft} col-sm-7`}>
            <FormLeft first={first} second={second} third={third} forth={forth} />
          </div>
          <div className={`${styles.desktopRight} col-sm-5`}>
            <div className={styles.phoneGoBack} onClick={goBack}>&#x2716;</div>
            <p>Sign up</p>
            {forms[activeSection]}
            <Carousel totalSection={totalSection} activeSection={activeSection} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
