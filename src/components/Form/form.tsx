import React, { FC, ReactNode } from 'react';

export interface FormProps {
    name?: string;
    children?: ReactNode;
}

export const Form: FC<FormProps> = ({
    name = 'rainbow-form',
    children
}) => {
    return (
        <form name={name} className='rainbow-form'>
            {children}
        </form>
    )
}

export default Form;