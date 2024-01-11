import React, { useRef, useState } from 'react'
import styles from '../style/Modal.module.css'
import x from '../assets/X.png'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FRONT_PATH } from '../api/ServerApi';

const Modal = ({value, setOpen }) => {

    const linkRef = useRef(null);

    const closeModal = () => {
    setOpen((last) => !last);
    };

    const stopPropagation = (e) => {
    e.stopPropagation();
    };


  return (
    <div className={styles.modalBackground} onClick={closeModal}>
      <div className={styles.modalContent} onClick={stopPropagation}>
        <img src={x} alt="x" className={styles.x} onClick={closeModal} />
        <div className={styles.input}>
            <InputGroup className="mb-3">
            <FormControl
                readOnly
                ref={linkRef}
                value={`${FRONT_PATH}/#/shared/${value}`}
            />
            </InputGroup>
        </div>
      </div>
    </div>
  );
};

export default Modal;