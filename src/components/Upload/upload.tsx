import axios from 'axios'
import React, { ChangeEvent, FC, useRef, useState } from 'react'
import Button from '../Button'
import Dragger from './dragger'
import UploadList from './uploadList'


// 文件状态类型
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

// 上传文件接口
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

// 上传组件属性接口
export interface UploadProps {
    // 必选属性
    action: string; // 上传地址
    // 可选属性
    defaultFileList?: UploadFile[]; // 默认文件列表
    beforeUpload?: (file: File) => boolean | Promise<File>; // 上传前钩子
    onProgress?: (percentage: number, file: File) => void; // 进度回调
    onSuccess?: (data: any, file: File) => void; // 成功回调
    onError?: (err: any, file: File) => void; // 失败回调
    onChange?: (file: File) => void; // 状态改变回调
    onRemove?: (file: UploadFile) => void; // 文件移除回调
    headers?: { [key: string]: any }; // 设置请求头
    name?: string; // 文件字段名
    data?: { [key: string]: any }; // 额外参数
    withCredentials?: boolean; // 是否携带cookie
    accept?: string; // 接受的文件类型
    multiple?: boolean; // 是否支持多选
    drag?: boolean; // 是否支持拖拽上传
    children?: React.ReactNode; // 自定义内容
}

// 上传组件
export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        defaultFileList = [],
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        onRemove,
        headers,
        name = 'file',
        data,
        withCredentials,
        accept,
        multiple,
        drag,
        children
    } = props

    // 文件列表状态
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList)
    // 文件输入引用
    const fileInput = useRef<HTMLInputElement>(null)

    // 更新文件状态
    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
            return prevList.map(file => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj }
                }
                return file
            })
        })
    }

    // 处理点击上传按钮
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }

    // 处理文件变更
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }

    // 上传文件
    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (beforeUpload) {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        if (typeof processedFile === 'boolean') {
                            if (processedFile) {
                                post(file)
                            }
                        } else {
                            post(processedFile)
                        }
                    })
                } else if (typeof result === 'boolean') {
                    if (result) {
                        post(file)
                    }
                } else {
                    post(result as File)
                }
            } else {
                post(file)
            }
        })
    }

    // 处理文件移除
    const handleRemove = (file: UploadFile) => {
        setFileList(prevList => {
            return prevList.filter(item => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }

    // 发送文件
    const post = (file: File) => {
        // 创建上传文件对象
        const uploadFile: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            raw: file,
            percent: 0
        }
        // 添加到文件列表
        setFileList(prevList => [...prevList, uploadFile])

        // 创建表单数据
        const formData = new FormData()
        formData.append(name, file)

        // 添加额外数据
        if (data) {
            Object.keys(data).forEach(key => {
                formData.append(key, data[key])
            })
        }

        // 发送请求
        axios.post(action, formData, {
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials,
            onUploadProgress: (e) => {
                if (e.total) {
                    // 计算进度百分比
                    const percentage = Math.round((e.loaded * 100) / e.total) || 0
                    // 更新文件状态
                    updateFileList(uploadFile, { status: 'uploading', percent: percentage })
                    if (percentage < 100) {
                        onProgress && onProgress(percentage, file)
                    }
                }
            }
        }).then(resp => {
            // 处理成功响应
            updateFileList(uploadFile, { status: 'success', response: resp.data })
            if (onSuccess) {
                onSuccess(resp.data, file)
                onChange && onChange(file)
            }
        }).catch(err => {
            // 处理错误
            console.error(err)
            updateFileList(uploadFile, { status: 'error', error: err })
            if (onError) {
                onError(err, file)
                onChange && onChange(file)
            }
        })
    }

    return (
        <div className="rainbow-ui-upload-component">
            {/* 拖拽上传区域 */}
            {drag ?
                <Dragger onFile={files => { uploadFiles(files) }}>
                    {children || (
                        <div className="rainbow-ui-upload-dragger-inner">
                            <p className="rainbow-ui-upload-drag-icon">拖拽文件到此处上传</p>
                            <p className="rainbow-ui-upload-drag-text">或点击选择文件</p>
                        </div>
                    )}
                </Dragger> :
                <Button btnType={Button.Type.Primary} onClick={handleClick}>上传文件</Button>
            }
            {/* 文件输入框 */}
            <input
                className="rainbow-ui-file-input"
                style={{ display: 'none' }}
                ref={fileInput}
                onChange={handleFileChange}
                type="file"
                accept={accept}
                multiple={multiple}
            />
            {/* 文件列表 */}
            <UploadList
                fileList={fileList}
                onRemove={handleRemove}
            />
        </div>
    )
}

export default Upload
