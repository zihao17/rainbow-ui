import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import React, { CSSProperties, ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/icon';
import './image.scss';
import ImagePreview from './imagePreview';

library.add(fas);

// 定义预览操作枚举
enum PreviewActionType {
    Zoom = 'zoom',
    Rotate = 'rotate',
    Prev = 'prev',
    Next = 'next',
    Close = 'close'
}

// 定义对象适配属性
enum ObjectFit {
    Fill = 'fill',
    Contain = 'contain',
    Cover = 'cover',
    None = 'none',
    ScaleDown = 'scale-down'
}

// 图片组件的属性接口
interface ImageProps {
    /** 图片源地址 */
    src: string;
    /** 图片加载失败时的替代文本 */
    alt?: string;
    /** 是否启用预览功能 */
    preview?: boolean;
    /** 图片懒加载 */
    lazy?: boolean;
    /** 图片宽度 */
    width?: string | number;
    /** 图片高度 */
    height?: string | number;
    /** 图片圆角 */
    borderRadius?: string | number;
    /** 自定义样式 */
    style?: CSSProperties;
    /** 图片适应容器的方式 */
    objectFit?: ObjectFit;
    /** 自定义类名 */
    className?: string;
    /** 占位图内容 */
    placeholder?: ReactNode;
    /** 加载失败时显示的内容 */
    fallback?: ReactNode;
    /** 预览组属性，用于多图片切换 */
    previewGroup?: {
        /** 当前预览组的所有图片 */
        images: string[];
        /** 当前图片在预览组中的索引 */
        current?: number;
    };
    /** 图片点击事件 */
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// 图像预览组件的属性接口
interface PreviewProps {
    visible: boolean;
    src: string;
    onClose: () => void;
    images?: string[];
    current?: number;
}

/**
 * Rainbow UI 的图片组件，用于图片展示和预览
 *
 * ### 使用示例:
 * ```
 * // 基本使用
 * <Image src="https://example.com/image.jpg" alt="示例图片" />
 *
 * // 带预览的图片
 * <Image src="https://example.com/image.jpg" preview={true} />
 *
 * // 懒加载图片
 * <Image src="https://example.com/image.jpg" lazy={true} />
 *
 * // 自定义样式
 * <Image
 *   src="https://example.com/image.jpg"
 *   width={300}
 *   height={200}
 *   borderRadius="10px"
 * />
 * ```
 */
const Image = ((props: ImageProps) => {
    const {
        src,
        alt,
        preview = true,
        lazy = false,
        width,
        height,
        borderRadius,
        style,
        objectFit = ObjectFit.Cover,
        className,
        placeholder,
        fallback,
        previewGroup,
        onClick,
        ...restProps
    } = props;

    // 状态管理
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [showPreview, setShowPreview] = useState<boolean>(false);
    const [hasBeenInView, setHasBeenInView] = useState<boolean>(!lazy);
    const imageRef = useRef<HTMLImageElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 处理图片加载事件
    const handleLoad = () => {
        setIsLoading(false);
    };

    // 处理图片加载失败事件
    const handleError = () => {
        setIsLoading(false);
        setIsError(true);
    };

    // 处理图片点击事件
    const handleImageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (preview && !isError) {
            setShowPreview(true);
        }
        onClick && onClick(e);
    };

    // 关闭预览
    const closePreview = () => {
        setShowPreview(false);
    };

    // 懒加载逻辑
    useEffect(() => {
        if (!lazy || hasBeenInView) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasBeenInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [lazy, hasBeenInView]);

    // 计算容器类名
    const containerClasses = classNames('rainbow-image-container', className, {
        'rainbow-image-loading': isLoading && !isError,
        'rainbow-image-error': isError,
    });

    // 计算自定义样式
    const containerStyles: CSSProperties = {
        width: width,
        height: height,
        borderRadius: borderRadius as string,
        ...style,
    };

    // 计算图片样式
    const imageStyles: CSSProperties = {
        objectFit: objectFit,
        display: (isLoading || isError) ? 'none' : 'block',
    };

    return (
        <>
            <div
                className={containerClasses}
                style={containerStyles}
                onClick={handleImageClick}
                ref={containerRef}
                {...restProps}
            >
                {/* 加载中显示占位内容 */}
                {isLoading && !isError && (
                    <div className="rainbow-image-placeholder">
                        {placeholder || (
                            <div className="rainbow-image-loading-icon">
                                <Icon icon="spinner" spin />
                            </div>
                        )}
                    </div>
                )}

                {/* 加载失败显示占位内容 */}
                {isError && (
                    <div className="rainbow-image-error-content">
                        {fallback || (
                            <div className="rainbow-image-error-icon">
                                <Icon icon="image" />
                                <span>加载失败</span>
                            </div>
                        )}
                    </div>
                )}

                {/* 实际图片（仅在非懒加载或已进入视图时渲染） */}
                {(hasBeenInView) && (
                    <img
                        className="rainbow-image"
                        src={src}
                        alt={alt}
                        onLoad={handleLoad}
                        onError={handleError}
                        style={imageStyles}
                        ref={imageRef}
                    />
                )}
            </div>

            {/* 使用 Portal 将预览组件渲染到 body 末尾 */}
            {showPreview && createPortal(
                <ImagePreview
                    visible={showPreview}
                    src={src}
                    onClose={closePreview}
                    images={previewGroup?.images}
                    current={previewGroup?.current}
                />,
                document.body
            )}
        </>
    );
}) as React.FC<ImageProps> & {
    ObjectFit: typeof ObjectFit;
    PreviewActionType: typeof PreviewActionType;
};

// 将枚举作为静态属性添加到 Image 组件
Image.ObjectFit = ObjectFit;
Image.PreviewActionType = PreviewActionType;

export default Image;