import React, { FC, Dispatch, useEffect, useContext } from 'react';
import styles from '../../css/default.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useFetch } from '../../hooks/useFetch';
import { Error } from '../default/Error';
import { PageContext, PageContextProps } from './PageContext';
import { PageForm, PageFormInputs } from './PageForm';
import { updateArray } from '../../utils/HelperFunctions';

interface EditPageModalProps {
    editPageModalIsOpen: boolean;
    setEditPageModalIsOpen: Dispatch<boolean>;
}

export const EditPageModal: FC<EditPageModalProps> = ({ editPageModalIsOpen, setEditPageModalIsOpen }) => {
    const {
        data: editedData,
        performFetch: fetchEditPage,
        fetchError: editPageError,
        loading: loadingEditPage,
    } = useFetch();
    const { pages, setPages, currentPage } = useContext<PageContextProps>(PageContext);

    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        console.log('Modal opened');
    };

    const closeModal = () => {
        setEditPageModalIsOpen(false);
    };

    const editPage = async (data: PageFormInputs) => {
        await fetchEditPage(`http://localhost:8000/api/pages/${currentPage?.id}/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        closeModal();
    };

    useEffect(() => {
        if (!editedData || !pages || !currentPage) {
            return;
        }
        setPages([...updateArray(pages, currentPage.id, editedData)]);
    }, [editedData]);
    // React Hook useEffect has missing dependencies: 'currentPage', 'pages', and 'setPages'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

    return (
        <Modal
            isOpen={editPageModalIsOpen}
            onAfterOpen={afterOpenModal}
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
                    loading={loadingEditPage}
                    setDisplayModal={setEditPageModalIsOpen}
                    submitFn={editPage}
                    submitBtnText='Update'
                    showDefaultValues={true}
                />
                {editPageError && <Error msg={'Error editing page'} marginTop={true} />}
            </div>
        </Modal>
    );
};
