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
    alias?: string;
}

// note: title is case sensitive, so may not register properly if capitalisation is not congruent with Yup schema fields
export const InputField: FC<InputFieldProps> = ({ title, type, cls, placeholder, disabled = false, alias }) => {
    const { register } = useFormContext();
    const tags: { [key: string]: string } = {
        text: 'input',
        textarea: 'textarea',
    };
    const Tag: any = tags[type];

    return (
        <FieldContainer title={title} cls={cls} alias={alias}>
            <Tag type={type} id={title} {...register(title)} placeholder={placeholder} disabled={disabled} />
        </FieldContainer>
    );
};

interface SelectFieldProps extends InputFieldProps {
    children: ReactNode;
    alias?: string;
}

export const SelectField: FC<SelectFieldProps> = ({ title, cls, disabled = false, children, alias }) => {
    const { register } = useFormContext();

    return (
        <FieldContainer title={title} cls={cls} alias={alias}>
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
    alias?: string;
}

const FieldContainer: FC<FieldContainerProps> = ({ title, cls = '', children, alias }) => {
    const { errors } = useFormState();

    return (
        <div className={`${styles.inputContainer} ${cls}`}>
            <label htmlFor={title}>{alias ?? capitalise(title)}:</label>
            {children}
            {errors?.[title] && <span className={styles.required}>{errors?.[title]?.message}</span>}
        </div>
    );
};
