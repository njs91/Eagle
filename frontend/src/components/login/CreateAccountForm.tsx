import React, { VFC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from '../default/Form';
import styles from '../../css/default.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { createAccountSchema } from '../../schemas/CreateAccountSchema';
import { Loading } from '../default/Loading';
import { Error } from '../default/Error';

export type CreateAccountFormInputs = {
    email: string;
    password: string;
    firstName: string;
    lastName?: string | null;
    username: string;
};

export const CreateAccountForm: VFC = () => {
    const methods = useForm<CreateAccountFormInputs>({
        resolver: yupResolver(createAccountSchema),
        mode: 'onTouched',
        defaultValues: {
            email: '',
            password: '',
            firstName: '',
            lastName: null,
            username: '',
        },
    });
    const onSubmit: SubmitHandler<CreateAccountFormInputs> = (data) => {
        console.log('submitted with: ', data);

        // note: if clicking inside lastName, input changes from null to '', so submit as the following:
        console.log(
            'lastName: ',
            data.lastName,
            ' - will submit as: ',
            data?.lastName?.length === 0 ? null : data.lastName
        );
    };
    const loading = false; // @todo
    const error = false; // @todo

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.formInner}>
                        <InputField type='text' title='email' placeholder='joe@bloggs.com' />
                        <InputField type='text' title='password' placeholder='********' />
                        <InputField type='text' title='firstName' alias='First Name' placeholder='Joe' />
                        <InputField type='text' title='lastName' alias='Last Name' placeholder='Bloggs' />
                        <InputField type='text' title='username' placeholder='Enter a username' />
                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        <button type='submit' className={styles.btnPrimary}>
                            Register
                        </button>
                    )}
                </form>
            </FormProvider>
            {error && <Error msg={'Error logging in'} marginTop={true} />}
        </>
    );
};
