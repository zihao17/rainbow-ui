import classNames from 'classnames';
import React from 'react';

// 按钮尺寸枚举
enum ButtonSize {
    Large = 'lg',
    Middle = 'md',
    Small = 'sm',
}

// 按钮类型枚举
enum ButtonType {
    Default = 'default',
    Primary = 'primary',
    Warning = 'warning',
    Danger = 'danger',
    Link = 'link',
}

// 基础按钮属性接口
interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

// 原生按钮属性
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>
// 锚点按钮属性
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement>
// 合并按钮属性类型
type ButtonProps = BaseButtonProps & Partial<NativeButtonProps & AnchorButtonProps>

// 按钮组件
// 使用函数表达式和类型断言结合的方式定义组件
// 这种方式可以同时支持组件的静态属性和props验证
const Button = ((props: ButtonProps) => {
    const {
        btnType = ButtonType.Default,
        disabled = false,
        size,
        children,
        href,
        className,
        ...restProps
    } = props;
    // 组合按钮的样式类名
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': disabled,
    });
    if (btnType === ButtonType.Link && href) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        );
    }
    return (
        <button
            className={classes}
            disabled={disabled}
            {...restProps}
        >
            {children}
        </button>
    );
}) as React.FC<ButtonProps> & {
    Size: typeof ButtonSize;
    Type: typeof ButtonType;
};

// 将枚举作为静态属性添加到 Button 组件
Button.Size = ButtonSize;
Button.Type = ButtonType;

export type { ButtonProps };
export default Button;