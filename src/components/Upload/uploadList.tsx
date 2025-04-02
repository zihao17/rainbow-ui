import React, { FC } from 'react'
import { UploadFile } from './upload'
import Icon from '../Icon'
import Progress from '../Progress'
import classNames from 'classnames'

// 定义接口 - 文件列表组件的属性
interface UploadListProps {
    fileList: UploadFile[]; // 文件列表
    onRemove: (file: UploadFile) => void; // 移除文件的回调
}

// 文件列表组件
export const UploadList: FC<UploadListProps> = (props) => {
    const { fileList, onRemove } = props

    return (
        <ul className="rainbow-ui-upload-list">
            {fileList.map(item => {
                return (
                    <li className="rainbow-ui-upload-list-item" key={item.uid}>
                        <span className={classNames("file-name", {
                            [`file-name-${item.status}`]: item.status
                        })}>
                            {/* 根据文件状态显示不同图标 */}
                            <Icon icon="file-alt" theme="secondary" />
                            {item.name}
                        </span>
                        <span className="file-status">
                            {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme="primary" />}
                            {item.status === 'success' && <Icon icon="check-circle" theme="success" />}
                            {item.status === 'error' && <Icon icon="times-circle" theme="danger" />}
                        </span>
                        <span className="file-actions">
                            <Icon icon="times" onClick={() => onRemove(item)} />
                        </span>
                        {/* 上传进度显示 */}
                        {item.status === 'uploading' &&
                            <Progress
                                percent={item.percent || 0}
                            />
                        }
                    </li>
                )
            })}
        </ul>
    )
}

export default UploadList