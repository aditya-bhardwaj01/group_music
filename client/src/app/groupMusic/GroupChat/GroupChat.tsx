import React, { useRef, useState } from 'react'
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import ChatDark from '../../../assets/musicPage/topBar/chatDark.png';
import ChatLight from '../../../assets/musicPage/topBar/chatLight.png';
import ChatBody from './ChatBody/ChatBody';
import Members from './Members/Members';

import styles from './GroupChat.module.css'

const GroupChat = () => {
  const colorMode = useSelector((state: RootState) => state.applicationState.theme);
  const headerRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={`${styles.GroupChat} ${colorMode === 1 ? styles.GroupChatLight : styles.GroupChatDark}`}>
      <button className={styles.ChatIcon} onClick={handleShow}>
        <Image src={colorMode === 1 ? ChatLight : ChatDark} alt='Chat' />
      </button>

      <Modal show={show} onHide={handleClose} aria-labelled-by="contained-modal-title-vcenter" data-bs-theme={colorMode === 1 ? 'light' : 'dark'} size='md' centered style={{ color: colorMode === 1 ? 'black' : 'white' }}>
        <Modal.Header closeButton className={styles.modalHeader} ref={headerRef}>
          <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: 18 }}>
            <Members />
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.modalBody}>
          <ChatBody />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default GroupChat