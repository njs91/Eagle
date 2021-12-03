import React, { FC, Dispatch, useEffect, useContext } from 'react';
import styles from '../../css/default.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useFetch } from '../../hooks/useFetch';
import { WebPage } from './Pages';
import { Loading, Error } from '../Default';
import { PageContext, PageContextProps } from './PageContext';
import { removeFromArray } from '../../utils/HelperFunctions';

interface DeletePageModalProps {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<boolean>;
    currentPage: WebPage;
}

export const DeletePageModal: FC<DeletePageModalProps> = ({ modalIsOpen, setModalIsOpen, currentPage }) => {
    const {
        data: deletedData,
        performFetch: fetchDeletePage,
        fetchError: deletePageError,
        loading: loadingDeletePage,
    } = useFetch();
    const { pages, setPages } = useContext<PageContextProps>(PageContext);

    const afterOpenModal: () => void = () => {
        // references are now sync'd and can be accessed.
        console.log('Modal opened');
    };

    const closeModal: () => void = () => {
        setModalIsOpen(false);
    };

    const deletePage = async () => {
        await fetchDeletePage(`http://localhost:8000/api/pages/${currentPage.id}`, {
            method: 'DELETE',
        });
        closeModal();
    };

    useEffect(() => {
        if (!deletedData || !deletedData?.success || !pages || !currentPage) {
            return;
        }

        setPages([...removeFromArray(currentPage.id, pages)]);
    }, [deletedData]);

    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className={styles.modal}
            contentLabel='Delete page confirmation'
        >
            <button onClick={closeModal} className={styles.close}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <div>
                <h2>Delete Page</h2>
                <p>Are you sure you want to delete page {currentPage.title.toLowerCase()}?</p>
                {loadingDeletePage ? (
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
                {deletePageError && <Error msg={'Error deleting page'} />}
            </div>
        </Modal>
    );
};
