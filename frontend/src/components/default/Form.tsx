import React, { FC, ReactNode } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import styles from '../../css/default.module.scss';
import { capitalise } from '../../utils/HelperFunctions';

interface InputFieldProps {
    title: string;
    type: string;
    cls?: string;
    placeholder?: string;
    disabled?: boolean;
}

export const InputField: FC<InputFieldProps> = ({ title, type, cls, placeholder, disabled = false }) => {
    const { register } = useFormContext();
    const tags: { [key: string]: string } = {
        text: 'input',
        textarea: 'textarea',
    };
    const Tag: any = tags[type];

    return (
        <FieldContainer title={title} cls={cls}>
            <Tag type={type} id={title} {...register(title)} placeholder={placeholder} disabled={disabled} />
        </FieldContainer>
    );
};

interface SelectFieldProps extends InputFieldProps {
    children: ReactNode;
}

export const SelectField: FC<SelectFieldProps> = ({ title, cls, disabled = false, children }) => {
    const { register } = useFormContext();

    return (
        <FieldContainer title={title} cls={cls}>
            <select id={title} {...register(title)} disabled={disabled}>
                {children}
            </select>
        </FieldContainer>
    );
};

interface FieldContainerProps {
    title: string;
    children: ReactNode;
    cls?: string;
}

const FieldContainer: FC<FieldContainerProps> = ({ title, cls = '', children }) => {
    const { errors } = useFormState();

    return (
        <div className={`${styles.inputContainer} ${cls}`}>
            <label htmlFor={title}>{capitalise(title)}:</label>
            {children}
            {errors?.[title] && <span className={styles.required}>{errors?.[title]?.message}</span>}
        </div>
    );
};
