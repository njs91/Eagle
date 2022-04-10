import React, { VFC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { InputField } from '../default/Form';
import styles from '../../css/default.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/LoginSchema';
import { Loading } from '../default/Loading';
import { Error } from '../default/Error';

export type LoginFormInputs = {
    username: string;
    password: string;
};

export const LoginForm: VFC = () => {
    const methods = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema),
        mode: 'onTouched',
        defaultValues: {
            username: '',
            password: '',
        },
    });
    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        console.log('submitted with: ', data);
    };
    const loading = false; // @todo
    const error = false; // @todo

    console.log('onSubmit', onSubmit);

    return (
        <>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={styles.formInner}>
                        <InputField type='text' title='username' />
                        <InputField type='text' title='password' placeholder='********' />
                    </div>

                    {loading ? (
                        <Loading />
                    ) : (
                        <button type='submit' className={styles.btnPrimary}>
                            Log in
                        </button>
                    )}
                </form>
            </FormProvider>
            {error && <Error msg={'Error logging in'} marginTop={true} />}
        </>
    );
};
