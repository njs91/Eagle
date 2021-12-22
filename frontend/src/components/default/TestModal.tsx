import React, { VFC, useState } from 'react';
import styles from '../../css/default.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export const TestModal: VFC = () => {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        console.log('Modal opened');
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const doSomething = () => {
        console.log('do something...');
    };

    // onRequestClose: do something when clicked close
    // contentLabel: just label the modal (aria name for accessibility)

    return (
        <div>
            <button onClick={openModal} className={styles.btnPrimary}>
                Open Modal
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                className={styles.modal}
                contentLabel='Example Modal'
                portalClassName={styles.modalOverlayWrap} // cannot use overlayClassName
            >
                <button onClick={closeModal} className={styles.close}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div>
                    <h2>Title</h2>
                    <p>Content</p>
                    <div className={styles.buttonsContainer}>
                        <button onClick={doSomething} className={styles.btnPrimary}>
                            Do Something
                        </button>
                        <button onClick={closeModal} className={styles.btnRed}>
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
