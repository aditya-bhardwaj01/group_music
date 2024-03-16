import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';

import styles from './CreateGroup.module.css'
import { CreateForm } from '../CreateForm/CreateForm';

const CreateGroup = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.CreateGroup}>
        <button className={styles.btn} onClick={handleShow}>
          <span>Create Group</span>
        </button>

        <Modal show={show} onHide={handleClose} aria-labelled-by="contained-modal-title-vcenter" data-bs-theme="dark" size='sm' centered style={{ color: 'white' }}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" style={{ fontSize: 18 }}>
            Create Group!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateForm />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default CreateGroup
