import React, { Dispatch, FC, useContext } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InputField, SelectField } from '../default/Form';
import styles from '../../css/default.module.scss';
import { PageContextProps, PageContext } from './PageContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { pageSchema } from '../../schemas/PageSchema';
import { Loading } from '../default/Loading';

export type PageFormInputs = {
    title: string;
    type: string;
    slug?: string;
    notes?: string;
};

interface PageFormProps {
    loading: boolean;
    setDisplayModal: Dispatch<boolean>;
    submitFn: (data: PageFormInputs) => {};
    submitBtnText: string;
    showDefaultValues?: boolean;
}

export const PageForm: FC<PageFormProps> = ({
    loading,
    setDisplayModal,
    submitFn,
    submitBtnText,
    showDefaultValues = false,
}) => {
    const { currentPage } = useContext<PageContextProps>(PageContext);
    const methods = useForm<PageFormInputs>({
        resolver: yupResolver(pageSchema),
        mode: 'onTouched',
        defaultValues: {
            title: showDefaultValues ? currentPage?.title : '',
            type: showDefaultValues ? currentPage?.type : '',
            slug: showDefaultValues ? currentPage?.slug : '',
            notes: showDefaultValues ? currentPage?.notes : '',
        },
    });
    const onSubmit: SubmitHandler<PageFormInputs> = (data) => submitFn(data);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className={styles.formInner}>
                    <InputField type='text' title='title' />
                    <SelectField type='select' title='type'>
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
                    <InputField type='text' title='slug' placeholder='e.g. /nginx/guide' />
                    <InputField type='textarea' title='notes' />
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <div className={styles.buttonsContainer}>
                        <button type='submit' className={styles.btnPrimary}>
                            {submitBtnText}
                        </button>
                        <button type='button' onClick={() => setDisplayModal(false)} className={styles.btnRed}>
                            Close
                        </button>
                    </div>
                )}
            </form>
        </FormProvider>
    );
};
