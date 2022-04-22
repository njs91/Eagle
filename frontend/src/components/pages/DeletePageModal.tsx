import React, { FC, Dispatch, useContext, useState } from 'react';
import styles from '../../css/default.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Loading } from '../default/Loading';
import { Error } from '../default/Error';
import { PageContext, PageContextProps } from './PageContext';
import { removeItemFromArray } from '../../utils/HelperFunctions';
import { WebPage } from './Pages';

interface DeletePageModalProps {
    deletePageModalIsOpen: boolean;
    setDeletePageModalIsOpen: Dispatch<boolean>;
}

export const DeletePageModal: FC<DeletePageModalProps> = ({ deletePageModalIsOpen, setDeletePageModalIsOpen }) => {
    const [fetchError, setFetchError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const {
        pagesData: { pages, setPages },
        currentPageData: { currentPage },
    } = useContext<PageContextProps>(PageContext);

    const closeModal = () => {
        setDeletePageModalIsOpen(false);
    };

    const deletePage = async () => {
        if (!currentPage?.id) return;

        const setSuccess = (success: boolean) => {
            setFetchError(!success);
            setLoading(false);
        };

        try {
            setLoading(true);
            const res = await fetch(`http://localhost:8000/api/pages/${currentPage.id}`, {
                method: 'DELETE',
            });
            if (!res.ok) return;
            setPages([...removeItemFromArray(currentPage.id, pages as WebPage[])]);
            setSuccess(true);
        } catch (error) {
            setSuccess(false);
            console.error(error);
        }

        closeModal();
    };

    return (
        <Modal
            isOpen={deletePageModalIsOpen}
            onRequestClose={closeModal}
            className={styles.modal}
            contentLabel='Delete page confirmation'
            portalClassName={styles.modalOverlayWrap} // cannot use overlayClassName
        >
            <button onClick={closeModal} className={styles.close}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <div>
                <h2>Delete Page</h2>
                <p>Are you sure you want to delete page {currentPage?.title.toLowerCase()}?</p>
                {loading ? (
                    <Loading />
                ) : (
                    <div className={styles.buttonsContainer}>
                        <button onClick={deletePage} className={styles.btnPrimary}>
                            Delete
                        </button>
                        <button onClick={closeModal} className={styles.btnRed}>
                            Close
                        </button>
                    </div>
                )}
                {fetchError && <Error msg={'Error deleting page'} marginTop={true} />}
            </div>
        </Modal>
    );
};
