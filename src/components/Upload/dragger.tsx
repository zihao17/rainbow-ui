import React, { FC, useState, DragEvent } from 'react'
import classNames from 'classnames'

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
    const classes = classNames('rainbow-ui-uploader-dragger', {
        'is-dragover': dragOver
    })

    return (
        <div
            className={classes}
            onDragOver={e => handleDrag(e, true)}
            onDragLeave={e => handleDrag(e, false)}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default Dragger