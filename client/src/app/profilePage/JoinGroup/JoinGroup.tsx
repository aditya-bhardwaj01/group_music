import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

import styles from './JoinGroup.module.css'
import { JoinForm } from '../JoinModal/JoinForm';

const JoinGroup = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.wrapper}>
      <button className={styles.anchor} onClick={handleShow}>Join Group</button>

      <Modal show={show} onHide={handleClose} aria-labelled-by="contained-modal-title-vcenter" data-bs-theme="dark" size='sm' centered style={{ color: 'white' }}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: 20 }}>
            Join Group!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JoinForm />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default JoinGroup
