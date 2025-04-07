import classNames from 'classnames'
import { FC } from 'react'
import Icon from '../Icon'
import Progress from '../Progress/progress'
import { UploadFile } from './upload'
import './uploadList.scss'

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
                            <span className="file-icon">
                                <Icon icon="file-alt" theme={Icon.Theme.Secondary} />
                            </span>
                            {item.name}
                        </span>
                        <span className="file-status">
                            {(item.status === 'uploading' || item.status === 'ready') && <Icon icon="spinner" spin theme={Icon.Theme.Primary} />}
                            {item.status === 'success' && <Icon icon="check-circle" theme={Icon.Theme.Success} />}
                            {item.status === 'error' && <Icon icon="times-circle" theme={Icon.Theme.Danger} />}
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