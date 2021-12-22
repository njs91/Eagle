import React, { FC } from 'react';
import LoadingImage from '../../images/loading.svg';

interface LoadingProps {
    clsOuter?: string;
}

export const Loading: FC<LoadingProps> = ({ clsOuter = '' }) => (
    <div className={clsOuter}>
        <img src={LoadingImage} alt='Loading' />
    </div>
);
