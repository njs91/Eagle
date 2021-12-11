import React, { FC, ReactNode } from 'react';
import styles from '../css/default.module.scss';
import { capitalise } from '../utils/HelperFunctions';

interface InputFieldProps {
    title: string;
    type: string;
    defaultValue?: any;
    cls?: string;
    placeholder?: string;
    disabled?: boolean;
    register: any;
    errors: any;
}

export const InputField: FC<InputFieldProps> = ({
    title,
    type,
    defaultValue,
    cls,
    placeholder,
    disabled = false,
    register,
    errors,
}) => {
    const tags: { [key: string]: string } = {
        text: 'input',
        textarea: 'textarea',
        select: 'select',
    };
    const Tag = tags[type];

    return (
        <FieldContainer title={title} errors={errors} cls={cls}>
            <Tag
                type={type}
                id={title}
                {...register(title)}
                defaultValue={defaultValue}
                placeholder={placeholder}
                disabled={disabled}
            />
        </FieldContainer>
    );
};

interface SelectFieldProps extends InputFieldProps {
    children: ReactNode;
}

export const SelectField: FC<SelectFieldProps> = ({
    title,
    defaultValue,
    cls,
    disabled = false,
    register,
    errors,
    children,
}) => (
    <FieldContainer title={title} errors={errors} cls={cls}>
        <select id={title} {...register(title)} defaultValue={defaultValue} disabled={disabled}>
            {children}
        </select>
    </FieldContainer>
);

interface FieldContainerProps {
    title: string;
    errors: any;
    children: ReactNode;
    cls?: string;
}

const FieldContainer: FC<FieldContainerProps> = ({ title, errors, cls, children }) => (
    <div className={`${styles.inputContainer} ${cls || ''}`}>
        <label htmlFor={title}>{capitalise(title)}:</label>
        {children}
        {errors?.[title] && <span className={styles.required}>{errors?.[title]?.message}</span>}
    </div>
);
