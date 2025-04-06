import React, { FC, ReactNode, createContext, FormEvent, useImperativeHandle, forwardRef, useContext } from 'react';
import classNames from 'classnames';
import useStore from './useStore';

// 表单属性接口
export interface FormProps {
    name?: string;
    className?: string;
    initialValues?: Record<string, any>;
    onFinish?: (values: Record<string, any>) => void;
    onFinishFailed?: (errorInfo: { values: Record<string, any>, errors: any }) => void;
    onValuesChange?: (changedValues: Record<string, any>, allValues: Record<string, any>) => void;
    layout?: 'horizontal' | 'vertical' | 'inline';
    labelCol?: { span?: number, offset?: number };
    wrapperCol?: { span?: number, offset?: number };
    labelAlign?: 'left' | 'right';
    labelWrap?: boolean;
    requiredMark?: boolean | 'optional';
    colon?: boolean;
    children?: ReactNode;
}

// 表单实例接口
export interface FormInstance {
    getFieldValue: (name: string) => any;
    getFieldsValue: () => Record<string, any>;
    setFieldValue: (name: string, value: any) => void;
    setFieldsValue: (values: Record<string, any>) => void;
    resetFields: () => void;
    validateFields: () => Promise<Record<string, any>>;
    submit: () => void;
}

// 表单上下文类型
export type IFormContext = Partial<FormInstance> & {
    dispatchFields: ReturnType<typeof useStore>['dispatchFields'];
    layout?: FormProps['layout'];
    labelCol?: FormProps['labelCol'];
    wrapperCol?: FormProps['wrapperCol'];
    labelAlign?: FormProps['labelAlign'];
    colon?: FormProps['colon'];
};

// 创建表单上下文
export const FormContext = createContext<IFormContext>({} as IFormContext);

// 创建useFormInstance hook
export const useFormInstance = (): FormInstance => {
    const context = useContext(FormContext);
    if (!context || !context.getFieldValue) {
        throw new Error('useFormInstance 必须在 Form 组件内部使用');
    }
    return context as FormInstance;
};

// 声明带静态方法的Form组件类型
export interface FormComponentType extends React.ForwardRefExoticComponent<FormProps & React.RefAttributes<FormInstance>> {
    useFormInstance: typeof useFormInstance;
}

// 表单组件
const InternalForm = forwardRef<FormInstance, FormProps>(({
    name = 'rainbow-form',
    className,
    initialValues = {},
    onFinish,
    onFinishFailed,
    onValuesChange,
    layout = 'horizontal',
    labelCol,
    wrapperCol,
    labelAlign = 'right',
    labelWrap = false,
    requiredMark = true,
    colon = true,
    children
}, ref) => {
    // 获取表单状态和方法
    const {
        form,
        fields,
        dispatchFields,
        getFieldsValue,
        setFieldsValue,
        resetFields,
        validateFields,
        getFieldValue,
        setFieldValue
    } = useStore(initialValues);

    // 处理表单提交
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        try {
            const values = await validateFields();
            onFinish?.(values);
        } catch (errorInfo) {
            onFinishFailed?.(errorInfo as any);
        }
    };

    // 创建表单实例
    const formInstance: FormInstance = {
        getFieldValue,
        getFieldsValue,
        setFieldValue,
        setFieldsValue,
        resetFields,
        validateFields,
        submit: () => {
            validateFields()
                .then(values => onFinish?.(values))
                .catch(errorInfo => onFinishFailed?.(errorInfo as any));
        }
    };

    // 将表单实例暴露给父组件
    useImperativeHandle(ref, () => formInstance);

    // 传递给表单项的上下文
    const passedContext: IFormContext = {
        ...formInstance,
        dispatchFields,
        layout,
        labelCol,
        wrapperCol,
        labelAlign,
        colon
    };

    // 表单类名
    const formClassName = classNames('rainbow-form', {
        [`rainbow-form-${layout}`]: layout,
        'rainbow-form-required-mark': requiredMark === true,
        'rainbow-form-required-mark-optional': requiredMark === 'optional',
        'rainbow-form-no-colon': !colon,
        'rainbow-form-label-wrap': labelWrap
    }, className);

    return (
        <form name={name} className={formClassName} onSubmit={handleSubmit}>
            <FormContext.Provider value={passedContext}>
                {children}
            </FormContext.Provider>
        </form>
    );
});

// 设置显示名称
InternalForm.displayName = 'RainbowForm';

// 创建增强后的Form组件
const Form = InternalForm as FormComponentType;
Form.useFormInstance = useFormInstance;

export default Form;