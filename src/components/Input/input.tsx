import React, { FC, ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './_style.scss';

// 输入框尺寸
type InputSize = 'lg' | 'sm'

/**
 * Input 输入框组件
 * 页面中最常用的的输入框控件，支持图标、前后缀、大小设置等
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 输入框大小，支持 lg 或 sm
     */
    size?: InputSize;
    /**
     * 添加图标，在右侧悬浮添加一个图标，用于提示
     */
    icon?: IconProp;
    /**
     * 添加前缀，用于配置一些固定组合
     */
    prepend?: string | ReactElement;
    /**
     * 添加后缀，用于配置一些固定组合
     */
    append?: string | ReactElement;
    /**
     * 输入框内容变化时的回调函数
     */
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 输入框组件，支持各种HTML原生input的属性
 * ~~~js
 * // 这样引用
 * import { Input } from 'rainbow-ui'
 * ~~~
 */
export const Input: FC<InputProps> = (props) => {
    const { disabled, size, icon, prepend, append, style, ...restProps } = props
    const classes = classNames('rainbow-input-wrapper', {
        [`input-size-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-append': !!append,
        'input-group-prepend': !!prepend,
        'input-with-icon': !!icon,
    })

    return (
        <div className={classes} style={style}>
            {prepend && <div className="rainbow-input-prepend">{prepend}</div>}
            {icon && <div className="icon-wrapper"><FontAwesomeIcon icon={icon} /></div>}
            <input
                className="rainbow-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {append && <div className="rainbow-input-append">{append}</div>}
        </div>
    )
}

export default Input;

// 根据目前input.tsx文件里写的，进一步完善补全，并帮我完成Input文件夹里的全部4个文件
