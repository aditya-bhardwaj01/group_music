import React from 'react';
import styles from './page.module.css';

interface FormErrorProps {
    errorMsg: string
}

export const FormError: React.FC<FormErrorProps> = ({ errorMsg }) => {
    return <div className={styles.FormError} style={{color: 'red'}}>
        {errorMsg}
    </div>;
};
