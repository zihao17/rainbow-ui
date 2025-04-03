import React, { FC, ReactNode, useContext, useEffect } from 'react';
import classNames from 'classnames'
import { FormContext } from './form'

export interface FormItemProps {
    name: string;
    label?: string;
    children?: ReactNode;
    valuePropName?: string;                 //  传给Item的value的名称
    trigger?: string;                       // 更新回调的名称
    getValueFromEvent?: (event: any) => any; // 获取事件对象的值
}

const Item: FC<FormItemProps> = ({
    name,
    label,
    children,
    valuePropName = 'value',
    trigger = 'onChange',
    getValueFromEvent = (e: any) => e.target.value
}) => {
    // 使用classNames创建条件类名
    const rowClass = classNames('rainbow-row', {
        'rainbow-row-no-label': !label,
    });

    const { dispatchFields } = useContext(FormContext)

    useEffect(() => {
        dispatchFields({ type: 'addField', name, value: { label, name } })
    },[])

    return (
        <div className={rowClass}>
            {
                label && (
                    <div className='rainbow-form-item-label'>
                        <label title={label}>
                            {label}
                        </label>
                    </div>
                )
            }
            <div className='rainbow-form-item-content'>
                {children}
            </div>
        </div>
    );
}

export default Item;