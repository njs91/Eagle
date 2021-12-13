import React, { FC, Dispatch, useEffect, useContext } from 'react';
import styles from '../../css/default.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useFetch } from '../../hooks/useFetch';
import { WebPage } from './Pages';
import { Loading, Error } from '../Default';
import { PageContext, PageContextProps } from './PageContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createPageSchema } from '../../schemas/CreatePageSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField, SelectField } from '../Form';
import { PageFormInputs } from './CreatePageModal';

interface EditPageModalProps {
    editPageModalIsOpen: boolean;
    setEditPageModalIsOpen: Dispatch<boolean>;
    currentPage: WebPage;
}

export const EditPageModal: FC<EditPageModalProps> = ({ editPageModalIsOpen, setEditPageModalIsOpen, currentPage }) => {
    const {
        data: editedData,
        performFetch: fetchEditPage,
        fetchError: editPageError,
        loading: loadingEditPage,
    } = useFetch();
    const { pages, setPages } = useContext<PageContextProps>(PageContext);

    const afterOpenModal: () => void = () => {
        // references are now sync'd and can be accessed.
        console.log('Modal opened');
    };

    const closeModal: () => void = () => {
        setEditPageModalIsOpen(false);
    };

    const editPage = async (data: PageFormInputs) => {
        // await fetchEditPage('http://localhost:8000/api/pages/', {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data),
        // });
        closeModal();
    };

    useEffect(() => {
        if (!editedData || !pages || !currentPage) {
            return;
        }
        setPages([editedData, ...pages]);
    }, [editedData]);
    // React Hook useEffect has missing dependencies: 'currentPage', 'pages', and 'setPages'. Either include them or remove the dependency array  react-hooks/exhaustive-deps

    return (
        <Modal
            isOpen={editPageModalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className={styles.modal}
            contentLabel='Edit page modal'
        >
            <button onClick={closeModal} className={styles.close}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <div>
                <h2>Edit Page</h2>
                <EditPageForm
                    editPage={editPage}
                    setEditPageModalIsOpen={setEditPageModalIsOpen}
                    loadingEditPage={loadingEditPage}
                />
                {editPageError && <Error msg={'Error editing page'} marginTop={true} />}
            </div>
        </Modal>
    );
};

interface EditPageFormProps {
    setEditPageModalIsOpen: Dispatch<boolean>;
    editPage: (data: PageFormInputs) => Promise<void>;
    loadingEditPage: boolean;
}

const EditPageForm: FC<EditPageFormProps> = ({ editPage, setEditPageModalIsOpen, loadingEditPage }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PageFormInputs>({
        resolver: yupResolver(createPageSchema), // @todo: correct? also rename createPageSchema?
        mode: 'onTouched',
    });
    const onSubmit: SubmitHandler<PageFormInputs> = (data) => editPage(data);

    // @todo: prepopulate form
    // @todo: refactor somehow? same/similar code to the create page modal; repeated

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formInner}>
                <InputField type='text' title='title' register={register} errors={errors} />
                <SelectField type='select' title='type' defaultValue='' register={register} errors={errors}>
                    {/* <optgroup label='Landing Pages'>
                        <option value='squeeze'>Squeeze Page</option>
                        <option value='clickthrough'>Click Through</option>
                    </optgroup>
                    <optgroup label='Sale Pages'>
                        <option value='product'>Product Page</option>
                        <option value='upsell'>Upsell</option>
                        <option value='downsell'>Downsell</option>
                    </optgroup> */}
                    <option value='' disabled hidden>
                        Select an option
                    </option>
                    <option value='landing'>Landing Page</option>
                    <option value='sale'>Sale Page</option>
                    <option value='other'>Other</option>
                </SelectField>
                <InputField
                    type='text'
                    title='slug'
                    register={register}
                    errors={errors}
                    placeholder='e.g. /nginx/guide'
                />
                <InputField type='textarea' title='notes' register={register} errors={errors} />
            </div>

            {loadingEditPage ? (
                <Loading />
            ) : (
                <div className={styles.buttonsContainer}>
                    <button type='submit' className={styles.btnPrimary}>
                        Update
                    </button>
                    <button type='button' onClick={() => setEditPageModalIsOpen(false)} className={styles.btnRed}>
                        Close
                    </button>
                </div>
            )}
        </form>
    );
};
