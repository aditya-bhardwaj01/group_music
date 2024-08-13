import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import socket from '../../../../socket';
import { Socket } from 'socket.io-client';
import SendMsg from '../../../../assets/musicPage/chat/sendMsg.png';
import Cookies from 'js-cookie';
import { decodeGroupId, formatDateString } from '@/app/utils';
import { FormError } from '@/components/FormError/page';
import { Loading } from '@/components/Loading/Loading';
import Image from "next/image";

import styles from './ChatBody.module.css';

interface ExtendedSocket extends Socket {
    hasEmittedNewUser?: boolean;
}

const ChatBody = () => {
    const messageContainerDiv = useRef<HTMLDivElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);
    const displayName = useSelector((state: RootState) => state.applicationState.displayName);
    const encodedGroupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
    const inputRef = useRef<HTMLInputElement>(null);
    const extendedSocket = socket as ExtendedSocket;

    const appendMessage = (message: string, senderName: string, extraClass: string) => {
        const container = document.querySelector(`.${styles.messageContainer}`);
        if (!container) {
            return;
        }

        // Create the main message div
        const messageDiv = document.createElement('div');
        messageDiv.className = `${styles.singleMessage} ${extraClass}`;

        // Create the inner message div
        const messageInnerDiv = document.createElement('div');
        messageInnerDiv.className = styles.messageInner;

        // Create the sender name and message text div
        const messageContentDiv = document.createElement('div');

        const senderNameSpan = document.createElement('span');
        senderNameSpan.className = styles.senderName;
        senderNameSpan.textContent = `${senderName}: `;

        const messageTextSpan = document.createElement('span');
        messageTextSpan.className = styles.messageText;
        messageTextSpan.textContent = message;

        messageContentDiv.appendChild(senderNameSpan);
        messageContentDiv.appendChild(messageTextSpan);

        // Create the message date-time div
        const messageDateTimeDiv = document.createElement('div');
        messageDateTimeDiv.className = styles.messageDateTime;
        const currTime = new Date();
        messageDateTimeDiv.textContent = formatDateString(currTime.toString());

        // Append inner divs to the main message div
        messageInnerDiv.appendChild(messageContentDiv);
        messageInnerDiv.appendChild(messageDateTimeDiv);

        messageDiv.appendChild(messageInnerDiv);

        // Append the main message div to the container
        container.appendChild(messageDiv);
    }

    const getOlderMessages = () => {
        setLoading(true);
        axios.post('http://localhost:3001/chat/getMessages', {
            accessToken: Cookies.get('accessToken'),
            groupId: decodeGroupId(encodedGroupId),
        })
            .then((response) => {
                setMessages(response.data.messages);
                setLoading(false);
                setErrorMsg('');
            })
            .catch((error) => {
                setLoading(false);
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
        const receiveMsg = (data: any) => {
            appendMessage(data.message.message, data.message.senderName, styles.othersMessage);
        }

        socket.on('receiveMsg', receiveMsg);
        getOlderMessages();

        return () => {
            socket.off('receiveMsg', receiveMsg);
        };
    }, []);

    const sendMessage = () => {
        const messageInput = inputRef.current;
        if (!messageInput) return;
        const msg = messageInput.value;
        if(msg === '') return;
        messageInput.value = '';

        extendedSocket.emit('sendMsg', {
            message: msg,
            displayName: displayName,
            groupId: decodeGroupId(encodedGroupId),
            accessToken: Cookies.get('accessToken'),
        });
        messageContainerDiv.current?.scrollIntoView({ behavior: 'smooth' });
        appendMessage(msg, displayName, styles.myMessage);
    };

    if (errorMsg !== '') return <FormError errorMsg={errorMsg} />
    if (loading) return <Loading height={20} width={20} />
    return (
        <div className={`${styles.ChatBody} ${colorMode === 1 ? styles.ChatBodyLight : styles.ChatBodyDark}`}>
            <div className={styles.messageContainer} ref={messageContainerDiv}>
                {messages.map((message, index) => (
                    <div key={index} className={`${styles.singleMessage} ${message.myMessage ? styles.myMessage : styles.othersMessage}`}>
                        <div className={styles.messageInner}>
                            <div>
                                <span className={styles.senderName}>{message.senderName}: </span>
                                <span className={styles.messageText}>{message.message}</span>
                            </div>
                            <div className={styles.messageDateTime}>
                                {formatDateString(message.dateTime)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.messageSender}>
                <input className={`${styles.msgTyping} ${colorMode === 1 && styles.msgTypingLight}`} type="text" ref={inputRef} onKeyDown={(event) => {
                    if (event.key === 'Enter') sendMessage()
                }} placeholder='Type you message' />
                <button onClick={sendMessage} className={`${styles.sendBtn} ${colorMode === 1 && styles.sendBtnWhite}`}>
                    <Image src={SendMsg} alt="Theme Picture"></Image>
                </button>
            </div>
        </div>
    )
}

export default ChatBody;