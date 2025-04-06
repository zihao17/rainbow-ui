import React, { FC, ReactNode, useContext, useEffect, ReactElement, cloneElement, useState } from 'react';
import classNames from 'classnames'
import { FormContext } from './form'
import { CustomRule } from './useStore'

export interface FormItemProps {
    name: string;
    label?: string;
    children?: ReactNode;
    valuePropName?: string;                 //  传给Item的value的名称
    trigger?: string;                       // 更新回调的名称
    getValueFromEvent?: (event: any) => any; // 获取事件对象的值
    rules?: CustomRule[];                    // 验证规则
    required?: boolean;                      // 是否必填
    hasFeedback?: boolean;                   // 是否显示反馈图标
    validateStatus?: 'success' | 'warning' | 'error' | 'validating'; // 校验状态
    help?: ReactNode;                        // 帮助提示
    labelCol?: { span?: number, offset?: number }; // 标签布局
    wrapperCol?: { span?: number, offset?: number }; // 内容布局
    colon?: boolean;                         // 是否显示冒号
    htmlFor?: string;                        // 标签的 htmlFor 属性
    noStyle?: boolean;                       // 是否不添加样式，只使用数据绑定功能
    dependencies?: string[];                 // 依赖的字段
    className?: string;                      // 自定义类名
    style?: React.CSSProperties;             // 自定义样式
}

interface ChildProps extends Record<string, any> {
    onChange?: (e: any) => void;
    [key: string]: any;
}

const Item: FC<FormItemProps> = ({
    name,
    label,
    children,
    valuePropName = 'value',
    trigger = 'onChange',
    getValueFromEvent = (e: any) => e.target ? e.target.value : e,
    rules = [],
    required = false,
    hasFeedback = false,
    validateStatus,
    help,
    labelCol,
    wrapperCol,
    colon,
    htmlFor,
    noStyle = false,
    dependencies = [],
    className,
    style
}) => {
    // 合并规则和必填属性
    const mergedRules = [...rules];
    if (required && !mergedRules.some(rule => typeof rule === 'object' && rule.required)) {
        mergedRules.unshift({ required: true, message: `请输入${label || '此项'}` });
    }

    // 获取表单上下文
    const {
        dispatch,
        fields,
        initialValues,
        validateField
    } = useContext(FormContext);

    // 获取布局上下文 (如果父组件中有提供)
    const layout = 'horizontal';
    const contextLabelCol = { span: 6, offset: undefined };
    const contextWrapperCol = { span: 18, offset: undefined };
    const labelAlign = 'right';
    const contextColon = true;

    // 字段状态
    const [fieldState, setFieldState] = useState({
        value: initialValues?.[name] || '',
        errors: [] as string[],
        touched: false,
        validating: false
    });

    // 注册字段
    useEffect(() => {
        if (dispatch) {
            dispatch({
                type: 'addField',
                name,
                value: { name, value: fieldState.value, rules: mergedRules, isValid: true, errors: [] }
            });
        }
    }, []);

    // 验证字段
    const validField = () => {
        if (validateField) {
            validateField(name);
        }
    };

    // 获取子元素
    const getControlled = () => {
        const childList = React.Children.toArray(children);
        if (childList.length === 0) {
            return null;
        }

        // 只支持一个子元素
        if (childList.length > 1) {
            console.warn('Form.Item只能包含一个子元素');
            return null;
        }

        const child = childList[0] as ReactElement;

        // 获取字段值
        const value = fields?.[name]?.value;

        // 返回克隆的子元素，注入表单控制属性
        const childProps = (child.props || {}) as ChildProps;
        const originalHandler = childProps[trigger];

        return cloneElement(child, {
            ...childProps,
            [valuePropName]: value,
            [trigger]: (e: any) => {
                const newValue = getValueFromEvent(e);
                // 更新字段值
                if (dispatch) {
                    dispatch({
                        type: 'updateValue',
                        name,
                        value: newValue
                    });
                }
                // 触发验证
                validField();
                // 调用原始回调
                if (originalHandler && typeof originalHandler === 'function') {
                    originalHandler(e);
                }
            }
        });
    };

    // 确定是否显示冒号
    const showColon = colon !== undefined ? colon : contextColon;

    // 确定标签布局
    const finalLabelCol = labelCol || contextLabelCol;
    const finalWrapperCol = wrapperCol || contextWrapperCol;

    // 创建样式类名
    const rowClass = classNames('rainbow-row', {
        'rainbow-row-no-label': !label,
        [`rainbow-form-item-${layout}`]: layout,
        'has-error': fieldState.errors.length > 0,
        'has-feedback': hasFeedback,
        [className || '']: className
    });

    // 创建标签类名
    const labelClassName = classNames('rainbow-form-item-label', {
        [`rainbow-form-item-label-${labelAlign}`]: labelAlign,
        [`rainbow-col-${finalLabelCol?.span}`]: finalLabelCol?.span,
        [`rainbow-col-offset-${finalLabelCol?.offset}`]: finalLabelCol?.offset
    });

    // 创建内容类名
    const contentClassName = classNames('rainbow-form-item-control', {
        [`rainbow-col-${finalWrapperCol?.span}`]: finalWrapperCol?.span,
        [`rainbow-col-offset-${finalWrapperCol?.offset}`]: finalWrapperCol?.offset
    });

    // 获取验证状态
    const status = validateStatus || (fieldState.errors.length > 0 ? 'error' : undefined);

    // 获取帮助信息
    const helpText = help || (fieldState.errors.length > 0 ? fieldState.errors[0] : undefined);

    // 如果是无样式模式，直接返回子元素
    if (noStyle) {
        return <>{getControlled()}</>;
    }

    return (
        <div className={rowClass} style={style}>
            {
                label && (
                    <div className={labelClassName}>
                        <label htmlFor={htmlFor || name} title={typeof label === 'string' ? label : undefined}>
                            {required && <span className="rainbow-form-item-required">*</span>}
                            {label}
                            {showColon && <span className="rainbow-form-item-colon">:</span>}
                        </label>
                    </div>
                )
            }
            <div className={contentClassName}>
                <div className="rainbow-form-item-content">
                    {getControlled()}
                    {status && hasFeedback && (
                        <div className={`rainbow-form-item-feedback-icon rainbow-form-item-feedback-icon-${status}`}>
                            {/* 这里可以添加不同状态的图标 */}
                        </div>
                    )}
                    {helpText && (
                        <div className={`rainbow-form-item-explain rainbow-form-item-explain-${status}`}>
                            {helpText}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Item;