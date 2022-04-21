import React, { FC, Dispatch, useContext, useState } from 'react';
import styles from '../../css/default.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Error } from '../default/Error';
import { PageContext, PageContextProps } from './PageContext';
import { PageForm, PageFormInputs } from './PageForm';
import { WebPage } from './Pages';

interface CreatePageModalProps {
    createPageModalIsOpen: boolean;
    setCreatePageModalIsOpen: Dispatch<boolean>;
}

export const CreatePageModal: FC<CreatePageModalProps> = ({ createPageModalIsOpen, setCreatePageModalIsOpen }) => {
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {
        pagesData: { pages, setPages },
    } = useContext<PageContextProps>(PageContext);

    const closeModal = () => {
        setCreatePageModalIsOpen(false);
    };

    const createPage = async (data: PageFormInputs) => {
        const setSuccess = (success: boolean) => {
            setFetchError(!success);
            setLoading(false);
        };
        try {
            setLoading(true);
            const res = await fetch('http://localhost:8000/api/pages/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) return;
            const resData = await res.json();
            setPages([resData, ...(pages as WebPage[])]);
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
            console.error(error);
        }
        closeModal();
    };

    return (
        <Modal
            isOpen={createPageModalIsOpen}
            onRequestClose={closeModal}
            className={styles.modal}
            contentLabel='Create page modal'
            portalClassName={styles.modalOverlayWrap} // cannot use overlayClassName
        >
            <button onClick={closeModal} className={styles.close}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <div>
                <h2>Create Page</h2>
                <PageForm
                    loading={loading}
                    setDisplayModal={setCreatePageModalIsOpen}
                    submitFn={createPage}
                    submitBtnText='Create'
                />
                {fetchError && <Error msg={'Error creating page'} marginTop={true} />}
            </div>
        </Modal>
    );
};
