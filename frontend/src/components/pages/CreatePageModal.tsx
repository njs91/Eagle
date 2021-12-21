import React, { FC, Dispatch, useEffect, useContext } from 'react';
import styles from '../../css/default.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useFetch } from '../../hooks/useFetch';
import { Error } from '../Default';
import { PageContext, PageContextProps } from './PageContext';
import { PageForm, PageFormInputs } from './PageForm';

interface CreatePageModalProps {
    createPageModalIsOpen: boolean;
    setCreatePageModalIsOpen: Dispatch<boolean>;
}

export const CreatePageModal: FC<CreatePageModalProps> = ({ createPageModalIsOpen, setCreatePageModalIsOpen }) => {
    const {
        data: createdData,
        performFetch: fetchCreatePage,
        fetchError: createPageError,
        loading: loadingCreatePage,
    } = useFetch();
    const { pages, setPages, currentPage } = useContext<PageContextProps>(PageContext);

    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        console.log('Modal opened');
    };

    const closeModal = () => {
        setCreatePageModalIsOpen(false);
    };

    const createPage = async (data: PageFormInputs) => {
        await fetchCreatePage('http://localhost:8000/api/pages/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        closeModal();
    };

    useEffect(() => {
        if (!createdData || !pages || !currentPage) {
            return;
        }
        setPages([createdData, ...pages]);
    }, [createdData]);
    // React Hook useEffect has missing dependencies: 'currentPage', 'pages', and 'setPages'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

    return (
        <Modal
            isOpen={createPageModalIsOpen}
            onAfterOpen={afterOpenModal}
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
                    loading={loadingCreatePage}
                    setDisplayModal={setCreatePageModalIsOpen}
                    submitFn={createPage}
                    submitBtnText='Create'
                />
                {createPageError && <Error msg={'Error creating page'} marginTop={true} />}
            </div>
        </Modal>
    );
};
