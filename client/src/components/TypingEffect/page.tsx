"use client"
import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import styles from './page.module.css'

const TypingEffect: React.FC<{ phrases: string[] }> = ({ phrases }) => {
    const typedTextRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: phrases,
      typeSpeed: 80,
      backSpeed: 40,
      loop: true,
    };

    const typed = new Typed(typedTextRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

    return <div className={styles.TypeAnimation}>
        <span ref={typedTextRef}></span>
  </div>;
};

export default TypingEffect;
