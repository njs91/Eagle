import React, { FC, Dispatch } from 'react';
import styles from '../../css/default.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface DeletePageModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<boolean>;
}

export const DeletePageModal: FC<DeletePageModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
}) => {
  const afterOpenModal: () => void = () => {
    // references are now sync'd and can be accessed.
    console.log('Modal opened');
  };

  const closeModal: () => void = () => {
    setModalIsOpen(false);
  };

  // onRequestClose: do something when clicked close
  // contentLabel: just label the modal (aria name for accessibility)

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className={styles.modal}
        contentLabel='Delete page confirmation'>
        <button onClick={closeModal} className={styles.close}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div>
          <h2>Title</h2>
          <p>Content</p>
          <button onClick={closeModal} className={styles.button}>
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};
