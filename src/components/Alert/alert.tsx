import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

// Alert 组件的主题类型
export enum AlertType {
    Success = 'success',
    Default = 'default',
    Danger = 'danger',
    Warning = 'warning'
}

// Alert 组件的接口定义
export interface AlertProps {
    /** 标题 */
    title?: string;
    /** 描述内容 */
    description?: string;
    /** 类型 */
    type?: AlertType;
    /** 关闭回调 */
    onClose?: () => void;
    /** 自定义类名 */
    className?: string;
    /** 自动关闭时间（毫秒），设为0则不自动关闭 */
    duration?: number;
    /** 是否可以被关闭 */
    closable?: boolean;
}

/**
 * Alert 组件 - 用于页面中展示重要的提示信息
 * 支持四种主题颜色：success、default、danger、warning
 * 可自动关闭，关闭时间支持自定义
 */
const Alert: React.FC<AlertProps> = (props) => {
    const {
        title,
        description,
        type = AlertType.Default,
        onClose,
        className,
        duration = 3000, // 默认3秒自动关闭
        closable = true, // 默认可关闭
    } = props;

    // 控制 Alert 显示状态
    const [visible, setVisible] = useState(true);
    // 控制 Alert 消失动画状态
    const [leaving, setLeaving] = useState(false);
    // 定时器引用
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // 关闭 Alert 的处理函数
    const handleClose = () => {
        setLeaving(true);
        // 动画结束后真正移除组件
        setTimeout(() => {
            setVisible(false);
            if (onClose) {
                onClose();
            }
        }, 300); // 300ms 与 CSS 过渡动画时间一致
    };

    useEffect(() => {
        // 每次组件挂载时重置状态
        setVisible(true);
        setLeaving(false);

        // 如果设置了自动关闭时间且大于0
        if (duration && duration > 0) {
            // 设置定时器
            timerRef.current = setTimeout(() => {
                handleClose();
            }, duration);
        }

        // 组件卸载时清除定时器
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [duration]);

    // 生成 Alert 样式类名
    const classes = classNames('rainbow-alert', className, {
        [`rainbow-alert-${type}`]: type,
        'rainbow-alert-leaving': leaving
    });

    // 如果不可见，不渲染
    if (!visible) {
        return null;
    }

    return (
        <div className={classes} role="alert">
            <div className="rainbow-alert-content">
                {title && <div className="rainbow-alert-title">{title}</div>}
                {description && (
                    <div className="rainbow-alert-description">{description}</div>
                )}
            </div>
            {closable && (
                <button
                    className="rainbow-alert-close-btn"
                    onClick={handleClose}
                    aria-label="关闭"
                >
                    <span className="rainbow-alert-close-icon">×</span>
                </button>
            )}
        </div>
    );
};

export default Alert;