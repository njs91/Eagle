import React, { FC, Dispatch, useEffect, useContext } from 'react';
import styles from '../../css/default.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useFetch } from '../../hooks/useFetch';
import { WebPage } from './Pages';
import { Loading, Error } from '../Default';
import { PageContext, PageContextProps } from './PageContext';
import { removeItemFromArray } from '../../utils/HelperFunctions';

interface DeletePageModalProps {
    deletePageModalIsOpen: boolean;
    setDeletePageModalIsOpen: Dispatch<boolean>;
    currentPage: WebPage;
}

export const DeletePageModal: FC<DeletePageModalProps> = ({
    deletePageModalIsOpen,
    setDeletePageModalIsOpen,
    currentPage,
}) => {
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
        setDeletePageModalIsOpen(false);
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
        setPages([...removeItemFromArray(currentPage.id, pages)]);
    }, [deletedData]);
    // React Hook useEffect has missing dependencies: 'currentPage', 'pages', and 'setPages'. Either include them or remove the dependency array  react-hooks/exhaustive-deps
    // can add all deps and then add setDeletePage(null) after setPages to prevent infinite loop, but then memory leak occurs: Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
    // useRef approach fails: https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp

    return (
        <Modal
            isOpen={deletePageModalIsOpen}
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
                {deletePageError && <Error msg={'Error deleting page'} marginTop={true} />}
            </div>
        </Modal>
    );
};
