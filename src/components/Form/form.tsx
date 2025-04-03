import React, { FC, ReactNode, createContext } from 'react';
import useStore from './useStore';

export interface FormProps {
    name?: string;
    children?: ReactNode;
}

export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatchFields'>;
export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = ({
    name = 'rainbow-form',
    children
}) => {
    const { form, fields, dispatchFields } = useStore();
    const passedContext: IFormContext = {
        dispatchFields
    }
    return (
        <div>
            <form name={name} className='rainbow-form'>
                <FormContext.Provider value={passedContext}>
                    {children}
                </FormContext.Provider>
            </form>
            <div>
                <pre>{JSON.stringify(fields, null, 2)}</pre>
                <pre>{JSON.stringify(form, null, 2)}</pre>
            </div>
        </div>
    )
}

export default Form;