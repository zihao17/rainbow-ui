import { useState, useReducer } from 'react'

export interface FileDetail {
    name: string;
    value: string;
    rules: any[];
    isValid: boolean;
    errors: any[];
}

export interface FieldsState {
    [key: string]: FileDetail;
}

export interface FormState {
    isValid: boolean;
}

export interface FieldsAction {
    type: 'addField';
    name:string;
    value: any;
}
function fieldsReducer(state: FieldsState, action: FieldsAction ): FieldsState {
    switch(action.type){
        case 'addField':
            return {
                ...state,
                [action.name]: { ...action.value }
            }
        default:
            return state;
    }
}

function useStore() {
    const [form, setForm] = useState<FormState>({
        isValid: true,
    });
    const [fields, dispatchFields] = useReducer(fieldsReducer, {});

    return {
        form,
        fields,
        dispatchFields,
    }
}

export default useStore;