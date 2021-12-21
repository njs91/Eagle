import React, { VFC, FC, ReactNode, useState } from 'react';
import styles from '../css/default.module.scss';
import LoadingImage from '../images/loading.svg';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

// @todo: divide this into multiple files inside a 'default' folder

interface SectionProps {
    children: ReactNode;
    clsOuter?: string;
    clsInner?: string;
    tag?: any;
    patterned?: boolean;
}

export const Section: FC<SectionProps> = ({
    children,
    clsOuter = '',
    clsInner = '',
    patterned,
    tag: Tag = 'section',
}) => {
    const outerClasses = `${styles.outer} ${patterned ? styles.patterned : ''} ${clsOuter}`;
    const innerClasses = `${styles.inner} ${clsInner}`;

    return (
        <Tag className={outerClasses}>
            <div className={innerClasses}>{children}</div>
        </Tag>
    );
};

interface LoadingProps {
    clsOuter?: string;
}

export const Loading: FC<LoadingProps> = ({ clsOuter = '' }) => (
    <div className={clsOuter}>
        <img src={LoadingImage} alt='Loading' />
    </div>
);

interface ErrorProps {
    msg: string;
    marginTop?: boolean;
}

export const Error: FC<ErrorProps> = ({ msg, marginTop }) => (
    <p className={`${styles.errorText} ${marginTop ? styles.marginTop : ''}`}>{msg}</p>
);

export const TestModal: VFC = () => {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    const openModal: () => void = () => {
        setIsOpen(true);
    };

    const afterOpenModal: () => void = () => {
        // references are now sync'd and can be accessed.
        console.log('Modal opened');
    };

    const closeModal: () => void = () => {
        setIsOpen(false);
    };

    const doSomething: () => void = () => {
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
