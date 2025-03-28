import React from 'react';
import classNames from 'classnames';


export enum ButtonSize {
    Large = 'lg',
    Middle = 'md',
    Small = 'sm',
}

export enum ButtonType {
    Default = 'default',
    Primary = 'primary',
    Warning = 'warning',
    Danger = 'danger',
    Link = 'link',
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children: React.ReactNode;
    href?: string;
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = BaseButtonProps & Partial<NativeButtonProps & AnchorButtonProps>

const Button: React.FC<ButtonProps> = (props) => {
    const {
        btnType = ButtonType.Default,
        disabled = false,
        size,
        children,
        href,
        className,
        ...restProps
    } = props;
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
};

export default Button;