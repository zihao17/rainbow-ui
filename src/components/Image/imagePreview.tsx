import { faChevronLeft, faChevronRight, faRotateLeft, faRotateRight, faSearch, faSearchMinus, faSearchPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './imagePreview.scss';

// 定义预览组件属性接口
export interface ImagePreviewProps {
    /** 是否可见 */
    visible: boolean;
    /** 图片源地址 */
    src: string;
    /** 关闭预览的回调 */
    onClose: () => void;
    /** 预览组中的所有图片 */
    images?: string[];
    /** 当前预览的图片索引 */
    current?: number;
}

/**
 * 图片预览组件，提供放大、缩小、旋转和图片切换功能
 */
const ImagePreview: React.FC<ImagePreviewProps> = ({
    visible,
    src,
    onClose,
    images = [],
    current = 0
}) => {
    // 内部状态管理
    const [scale, setScale] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(current);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [isMoving, setIsMoving] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });

    // 在组件挂载和props更新时更新当前图片
    useEffect(() => {
        if (images && images.length > 0) {
            setCurrentSrc(images[currentIndex] || src);
        } else {
            setCurrentSrc(src);
        }
    }, [images, currentIndex, src]);

    // 监听ESC键关闭预览
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowLeft' && images && images.length > 1) {
                handlePrev();
            } else if (e.key === 'ArrowRight' && images && images.length > 1) {
                handleNext();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [images, currentIndex]);

    // 重置缩放和旋转
    const resetTransform = () => {
        setScale(1);
        setRotation(0);
        setPosition({ x: 0, y: 0 });
    };

    // 放大图片
    const handleZoomIn = () => {
        setScale(prev => Math.min(prev + 0.25, 3));
    };

    // 缩小图片
    const handleZoomOut = () => {
        setScale(prev => Math.max(prev - 0.25, 0.5));
    };

    // 向左旋转
    const handleRotateLeft = () => {
        setRotation(prev => prev - 90);
    };

    // 向右旋转
    const handleRotateRight = () => {
        setRotation(prev => prev + 90);
    };

    // 切换到上一张图片
    const handlePrev = () => {
        if (images && images.length > 1) {
            resetTransform();
            setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
        }
    };

    // 切换到下一张图片
    const handleNext = () => {
        if (images && images.length > 1) {
            resetTransform();
            setCurrentIndex(prev => (prev + 1) % images.length);
        }
    };

    // 开始拖动图片
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsMoving(true);
        setStartPos({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    // 拖动图片
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isMoving) return;
        setPosition({
            x: e.clientX - startPos.x,
            y: e.clientY - startPos.y
        });
    };

    // 结束拖动
    const handleMouseUp = () => {
        setIsMoving(false);
    };

    // 计算图片样式
    const imageStyle = {
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
        cursor: isMoving ? 'grabbing' : 'grab'
    };

    // 如果预览不可见，不渲染任何内容
    if (!visible) return null;

    return (
        <div
            className="rainbow-image-preview-overlay"
            onClick={onClose}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="rainbow-image-preview-content" onClick={e => e.stopPropagation()}>
                <img
                    src={currentSrc}
                    alt="preview"
                    style={imageStyle}
                    onMouseDown={handleMouseDown}
                    className="rainbow-image-preview-img"
                />

                {/* 操作工具栏 */}
                <div className="rainbow-image-preview-toolbar">
                    <button onClick={handleZoomIn} title="放大">
                        <FontAwesomeIcon icon={faSearchPlus} />
                    </button>
                    <button onClick={handleZoomOut} title="缩小">
                        <FontAwesomeIcon icon={faSearchMinus} />
                    </button>
                    <button onClick={resetTransform} title="重置">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <button onClick={handleRotateLeft} title="向左旋转">
                        <FontAwesomeIcon icon={faRotateLeft} />
                    </button>
                    <button onClick={handleRotateRight} title="向右旋转">
                        <FontAwesomeIcon icon={faRotateRight} />
                    </button>
                    <button onClick={onClose} title="关闭">
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {/* 图片切换按钮 */}
                {images && images.length > 1 && (
                    <>
                        <button className="rainbow-image-preview-prev" onClick={handlePrev}>
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <button className="rainbow-image-preview-next" onClick={handleNext}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                        <div className="rainbow-image-preview-counter">
                            {currentIndex + 1} / {images.length}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImagePreview;