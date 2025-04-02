import React, { FC, ReactNode } from 'react';

export interface FormItemProps {
    label?: string;
    children?: ReactNode;
}
import classNames from 'classnames';

const FormItem: FC<FormItemProps> = ({
    label,
    children
}) => {
    // 使用classNames创建条件类名
    const rowClass = classNames('rainbow-form-item', {
        'rainbow-form-label': !label,
    });

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

export default FormItem;