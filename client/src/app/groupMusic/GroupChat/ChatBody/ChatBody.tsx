import React from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Image from 'next/image';

import styles from './ChatBody.module.css'

const ChatBody = () => {
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);

    return (
        <div className={`${styles.ChatBody} ${colorMode === 1 ? styles.ChatBodyLight : styles.ChatBodyDark}`}>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, accusamus debitis 
                voluptatibus adipisci voluptatum possimus necessitatibus culpa, dolore voluptate, 
                in eveniet! Praesentium eveniet consequatur distinctio ducimus iste, perspiciatis voluptas soluta.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, accusamus debitis 
                voluptatibus adipisci voluptatum possimus necessitatibus culpa, dolore voluptate, 
                in eveniet! Praesentium eveniet consequatur distinctio ducimus iste, perspiciatis voluptas soluta.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, accusamus debitis 
                voluptatibus adipisci voluptatum possimus necessitatibus culpa, dolore voluptate, 
                in eveniet! Praesentium eveniet consequatur distinctio ducimus iste, perspiciatis voluptas soluta.</p>
        </div>
    )
}

export default ChatBody;