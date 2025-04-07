import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';

// 主题类型
type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

// Icon 组件属性接口
interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
}

/**
 * Icon 组件 - 基于 FontAwesome 的图标组件
 */
const Icon = ((props: IconProps) => {
    const { className, theme, ...restProps } = props;
    const classes = classNames('rainbow-icon', className, {
        [`icon-${theme}`]: theme
    });
    return (
        <FontAwesomeIcon className={classes} {...restProps} />
    )
}) as React.FC<IconProps> & {
    Theme: {
        Primary: ThemeProps;
        Secondary: ThemeProps;
        Success: ThemeProps;
        Info: ThemeProps;
        Warning: ThemeProps;
        Danger: ThemeProps;
        Light: ThemeProps;
        Dark: ThemeProps;
    };
};

// 将 ThemeProps 作为静态属性添加到 Icon 组件
Icon.Theme = {
    Primary: 'primary',
    Secondary: 'secondary',
    Success: 'success',
    Info: 'info',
    Warning: 'warning',
    Danger: 'danger',
    Light: 'light',
    Dark: 'dark'
};

export type { IconProps, ThemeProps };
export default Icon;
