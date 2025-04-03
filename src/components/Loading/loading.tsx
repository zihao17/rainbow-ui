import React, { FC } from 'react';
import classNames from 'classnames';

// Loading 组件属性接口
export interface LoadingProps {
    /** 是否显示加载中 */
    isLoading?: boolean;
    /** 是否全屏显示 */
    fullscreen?: boolean;
    /** 是否显示遮罩层 */
    withMask?: boolean;
    /** 加载提示文本 */
    text?: string;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 球体数量 */
    ballCount?: number;
    /** 子元素 */
    children?: React.ReactNode;
}

/**
 * Loading 组件 - 用于显示加载中状态
 *
 * ### 引用方法
 *
 * ```jsx
 * import { Loading } from 'rainbow-ui'
 * ```
 */
export const Loading: FC<LoadingProps> = (props) => {
    const {
        isLoading = true,
        fullscreen = false,
        withMask = false,
        text,
        className,
        style,
        ballCount = 8,
        children,
    } = props;

    // 如果不需要显示加载状态，直接返回子元素
    if (!isLoading) {
        return <>{children}</>;
    }

    // 生成指定数量的彩虹球
    const generateBalls = () => {
        const balls = [];
        for (let i = 0; i < ballCount; i++) {
            balls.push(<div key={i} className="rainbow-ball" />);
        }
        return balls;
    };

    // 容器类名
    const classes = classNames('rainbow-loading-container', className, {
        'fullscreen': fullscreen,
        'with-mask': withMask
    });

    // 渲染加载组件
    const loadingComponent = (
        <div className={classes} style={style} data-testid="loading">
            <div className="rainbow-loading-spinner">
                {generateBalls()}
            </div>
            {text && <div className="rainbow-loading-text">{text}</div>}
        </div>
    );

    // 如果有子元素且不是全屏模式，将加载组件作为子元素的覆盖层
    if (children && !fullscreen) {
        return (
            <div style={{ position: 'relative' }}>
                {children}
                {loadingComponent}
            </div>
        );
    }

    return loadingComponent;
};

export default Loading;