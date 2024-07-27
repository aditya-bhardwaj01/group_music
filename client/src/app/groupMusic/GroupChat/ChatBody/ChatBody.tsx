import React, { useEffect, useRef } from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import socket from '../../../../socket';
import { Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { decodeGroupId } from '@/app/utils';

import styles from './ChatBody.module.css';

interface ExtendedSocket extends Socket {
    hasEmittedNewUser?: boolean;
}

const ChatBody = () => {
    const colorMode = useSelector((state: RootState) => state.applicationState.theme);
    const groupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
    const displayName = useSelector((state: RootState) => state.applicationState.displayName);
    const encodedGroupId = useSelector((state: RootState) => state.applicationState.encodedGroupId);
    const inputRef = useRef<HTMLInputElement>(null);
    const extendedSocket = socket as ExtendedSocket;

    useEffect(() => {
        const messageContainer = document.querySelector('.messages') as HTMLElement;

        const receiveHandler = (data: { name: string; message: string }) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('left');

            const messageP = document.createElement('p');

            const messageSpan = document.createElement('span');
            messageSpan.classList.add('sender-name');
            messageSpan.innerText = `${data.name}: `;

            messageP.append(messageSpan);
            messageP.append(data.message);
            messageDiv.append(messageP);
            messageContainer.append(messageDiv);
        };

        const leftHandler = (msg: string) => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('left', 'leave');

            const messageP = document.createElement('p');
            messageP.innerText = `${msg} left the chat`;
            messageDiv.append(messageP);
            messageContainer.append(messageDiv);
        };

        socket.on('receive', receiveHandler);
        socket.on('left', leftHandler);

        return () => {
            socket.off('receive', receiveHandler);
            socket.off('left', leftHandler);
        };
    }, []);

    const sendMessage = () => {
        const msgInput = inputRef.current;
        if (!msgInput) return;
        const msg = msgInput.value;
        msgInput.value = '';
        socket.emit('send', {
            message: msg,
            groupId: decodeURI(groupId.toString()),
            accessToken: Cookies.get('accessToken'),
        });

        const messageContainer = document.querySelector('.messages') as HTMLElement;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('right');

        const messageP = document.createElement('p');

        const messageSpan = document.createElement('span');
        messageSpan.classList.add('sender-name');
        messageSpan.innerText = `${name}: `;

        messageP.append(messageSpan);
        messageP.append(msg);
        messageDiv.append(messageP);
        messageContainer.append(messageDiv);
    };

    const exitChat = () => {
        socket.disconnect();
    };

    return (
        <div className={`${styles.ChatBody} ${colorMode === 1 ? styles.ChatBodyLight : styles.ChatBodyDark}`}>
            <h3 style={{ padding: '10px' }}>
                Welcome
                <button className='exit-chat' onClick={exitChat}>Exit Chat</button>
            </h3>

            <div className="message-area">
                <div className="messages">
                </div>
                <div className="type-send">
                    <input type="text" placeholder='Type your message' className='type-msg' ref={inputRef} />
                    <button onClick={sendMessage} className='send-msg'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default ChatBody;