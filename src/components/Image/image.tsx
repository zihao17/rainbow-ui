import React, { FC, useState, useRef, useEffect, CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

// 定义预览操作枚举
export enum PreviewActionType {
    Zoom = 'zoom',
    Rotate = 'rotate',
    Prev = 'prev',
    Next = 'next',
    Close = 'close'
}

// 定义对象适配属性
export enum ObjectFit {
    Fill = 'fill',
    Contain = 'contain',
    Cover = 'cover',
    None = 'none',
    ScaleDown = 'scale-down'
}

// 图片组件的属性接口
export interface ImageProps {
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
const Image: FC<ImageProps> = (props) => {
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

            {/* 预览组件 */}
            {showPreview && (
                <ImagePreview
                    visible={showPreview}
                    src={src}
                    onClose={closePreview}
                    images={previewGroup?.images}
                    current={previewGroup?.current}
                />
            )}
        </>
    );
};

/**
 * 图片预览组件
 */
const ImagePreview: FC<PreviewProps> = ({ visible, src, onClose, images, current = 0 }) => {
    const [scale, setScale] = useState<number>(1);
    const [rotate, setRotate] = useState<number>(0);
    const [currentIndex, setCurrentIndex] = useState<number>(current);
    const [isMoving, setIsMoving] = useState<boolean>(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    // 预览图片源
    const previewSrc = images ? images[currentIndex] : src;

    // 处理键盘事件
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowLeft':
                    if (images && images.length > 1) {
                        handlePrev();
                    }
                    break;
                case 'ArrowRight':
                    if (images && images.length > 1) {
                        handleNext();
                    }
                    break;
                case '+':
                    handleZoomIn();
                    break;
                case '-':
                    handleZoomOut();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [currentIndex, images]);

    // 图片操作函数
    const handleZoomIn = () => setScale(prev => Math.min(prev + 0.5, 5));
    const handleZoomOut = () => setScale(prev => Math.max(prev - 0.5, 0.5));
    const handleRotateLeft = () => setRotate(prev => prev - 90);
    const handleRotateRight = () => setRotate(prev => prev + 90);

    const handlePrev = () => {
        if (!images || images.length <= 1) return;
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
        resetImageState();
    };

    const handleNext = () => {
        if (!images || images.length <= 1) return;
        setCurrentIndex(prev => (prev + 1) % images.length);
        resetImageState();
    };

    // 重置图片状态
    const resetImageState = () => {
        setScale(1);
        setRotate(0);
        setPosition({ x: 0, y: 0 });
    };

    // 图片拖动相关函数
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMoving(true);
        setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMoving) return;
        setPosition({
            x: e.clientX - startPos.x,
            y: e.clientY - startPos.y
        });
    };

    const handleMouseUp = () => {
        setIsMoving(false);
    };

    // 双击恢复图片默认状态
    const handleDoubleClick = () => {
        resetImageState();
    };

    return (
        <div
            className="rainbow-image-preview-overlay"
            onClick={onClose}
        >
            <div className="rainbow-image-preview-content" onClick={e => e.stopPropagation()}>
                <div
                    className="rainbow-image-preview-img-container"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onDoubleClick={handleDoubleClick}
                >
                    <img
                        className="rainbow-image-preview-img"
                        src={previewSrc}
                        alt="预览图片"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotate}deg)`,
                            cursor: isMoving ? 'grabbing' : 'grab'
                        }}
                    />
                </div>

                {/* 预览工具栏 */}
                <div className="rainbow-image-preview-toolbar">
                    <button className="rainbow-image-preview-action" onClick={handleZoomIn}>
                        <Icon icon="search-plus" />
                    </button>
                    <button className="rainbow-image-preview-action" onClick={handleZoomOut}>
                        <Icon icon="search-minus" />
                    </button>
                    <button className="rainbow-image-preview-action" onClick={handleRotateLeft}>
                        <Icon icon="undo" />
                    </button>
                    <button className="rainbow-image-preview-action" onClick={handleRotateRight}>
                        <Icon icon="redo" />
                    </button>
                    {images && images.length > 1 && (
                        <>
                            <button className="rainbow-image-preview-action" onClick={handlePrev}>
                                <Icon icon="arrow-left" />
                            </button>
                            <span className="rainbow-image-preview-index">
                                {currentIndex + 1} / {images.length}
                            </span>
                            <button className="rainbow-image-preview-action" onClick={handleNext}>
                                <Icon icon="arrow-right" />
                            </button>
                        </>
                    )}
                    <button className="rainbow-image-preview-action close-action" onClick={onClose}>
                        <Icon icon="times" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Image;