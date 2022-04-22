import React, { FC, Dispatch, useContext, useState } from 'react';
import styles from '../../css/default.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Error } from '../default/Error';
import { PageContext, PageContextProps } from './PageContext';
import { PageForm, PageFormInputs } from './PageForm';
import { updateArray } from '../../utils/HelperFunctions';

interface EditPageModalProps {
    editPageModalIsOpen: boolean;
    setEditPageModalIsOpen: Dispatch<boolean>;
}

export const EditPageModal: FC<EditPageModalProps> = ({ editPageModalIsOpen, setEditPageModalIsOpen }) => {
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {
        pagesData: { pages, setPages },
        currentPageData: { currentPage },
    } = useContext<PageContextProps>(PageContext);

    const closeModal = () => {
        setEditPageModalIsOpen(false);
    };

    const editPage = async (data: PageFormInputs) => {
        if (!currentPage?.id || !pages) return;

        const setSuccess = (success: boolean) => {
            setFetchError(!success);
            setLoading(false);
        };

        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8000/api/pages/${currentPage?.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!res.ok) return;
            const resData = await res.json();
            setPages([...updateArray(pages, currentPage.id, resData)]);
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
            console.error(error);
        }

        closeModal();
    };

    return (
        <Modal
            isOpen={editPageModalIsOpen}
            onRequestClose={closeModal}
            className={styles.modal}
            contentLabel='Edit page modal'
            portalClassName={styles.modalOverlayWrap} // cannot use overlayClassName
        >
            <button onClick={closeModal} className={styles.close}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <div>
                <h2>Edit Page</h2>
                <PageForm
                    loading={loading}
                    setDisplayModal={setEditPageModalIsOpen}
                    submitFn={editPage}
                    submitBtnText='Update'
                    showDefaultValues={true}
                />
                {fetchError && <Error msg={'Error editing page'} marginTop={true} />}
            </div>
        </Modal>
    );
};
