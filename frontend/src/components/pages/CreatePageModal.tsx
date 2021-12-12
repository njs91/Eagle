import React, { FC, Dispatch, useEffect, useContext, VFC } from 'react';
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

interface CreatePageModalProps {
    createPageModalIsOpen: boolean;
    setCreatePageModalIsOpen: Dispatch<boolean>;
    currentPage: WebPage;
}

export const CreatePageModal: FC<CreatePageModalProps> = ({
    createPageModalIsOpen,
    setCreatePageModalIsOpen,
    currentPage,
}) => {
    const {
        data: createdData,
        performFetch: fetchCreatePage,
        fetchError: createPageError,
        loading: loadingCreatePage,
    } = useFetch();
    const { pages, setPages } = useContext<PageContextProps>(PageContext);

    const afterOpenModal: () => void = () => {
        // references are now sync'd and can be accessed.
        console.log('Modal opened');
    };

    const closeModal: () => void = () => {
        setCreatePageModalIsOpen(false);
    };

    const createPage = async (data: CreatePageFormInputs) => {
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
            contentLabel='Create page confirmation'
        >
            <button onClick={closeModal} className={styles.close}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            <div>
                <h2>Create Page</h2>
                <CreatePageForm
                    createPage={createPage}
                    setCreatePageModalIsOpen={setCreatePageModalIsOpen}
                    loadingCreatePage={loadingCreatePage}
                />
                {createPageError && <Error msg={'Error creating page'} marginTop={true} />}
            </div>
        </Modal>
    );
};

type CreatePageFormInputs = {
    title: string;
    type: string;
    slug?: string;
    notes?: string;
};

interface CreatePageFormProps {
    setCreatePageModalIsOpen: Dispatch<boolean>;
    createPage: (data: CreatePageFormInputs) => Promise<void>;
    loadingCreatePage: any;
}

const CreatePageForm: FC<CreatePageFormProps> = ({ createPage, setCreatePageModalIsOpen, loadingCreatePage }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreatePageFormInputs>({
        resolver: yupResolver(createPageSchema),
        mode: 'onTouched',
    });
    const onSubmit: SubmitHandler<CreatePageFormInputs> = (data) => createPage(data);

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

            {loadingCreatePage ? (
                <Loading />
            ) : (
                <div className={styles.buttonsContainer}>
                    <button type='submit' className={styles.btnPrimary}>
                        Create
                    </button>
                    <button type='button' onClick={() => setCreatePageModalIsOpen(false)} className={styles.btnRed}>
                        Close
                    </button>
                </div>
            )}
        </form>
    );
};
