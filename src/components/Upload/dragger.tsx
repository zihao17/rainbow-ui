import classNames from 'classnames';
import React, { DragEvent, FC, useState } from 'react';

// 拖拽区域属性接口
interface DraggerProps {
    onFile: (files: FileList) => void; // 处理文件的回调函数
    children?: React.ReactNode; // 子元素
}

// 拖拽上传组件
export const Dragger: FC<DraggerProps> = (props) => {
    const { onFile, children } = props
    // 是否处于拖拽中状态
    const [dragOver, setDragOver] = useState(false)

    // 拖拽事件处理
    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }

    // 处理文件放下事件
    const handleDrop = (e: DragEvent<HTMLElement>) => {
        e.preventDefault()
        setDragOver(false)
        if (e.dataTransfer.files) {
            onFile(e.dataTransfer.files)
        }
    }

    // 创建拖拽区域的className
    const classes = classNames('rainbow-ui-uploader-dragger', 'upload-area', {
        'is-dragover': dragOver
    })

    // 结合 App.css 中的样式，增强拖拽区域样式
    const draggerStyle = {
        border: '2px dashed #e0e0e0',
        borderRadius: '4px',
        padding: '20px',
        textAlign: 'center' as const,
        transition: 'all 0.3s',
        ...(dragOver ? {
            borderColor: 'var(--rainbow-blue, #1982c4)',
            backgroundColor: 'rgba(25, 130, 196, 0.05)'
        } : {})
    }

    return (
        <div
            className={classes}
            style={draggerStyle}
            onDragOver={e => handleDrag(e, true)}
            onDragLeave={e => handleDrag(e, false)}
            onDrop={handleDrop}
            onMouseEnter={() => setDragOver(true)}
            onMouseLeave={() => setDragOver(false)}
        >
            {children}
        </div>
    )
}

export default Dragger