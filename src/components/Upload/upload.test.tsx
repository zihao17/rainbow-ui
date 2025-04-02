import React from 'react'
import axios from 'axios'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Upload, { UploadProps } from './upload'

// 获取模拟的 axios
const mockedAxios = axios as jest.Mocked<typeof axios>

// 创建测试文件
const testFile = new File(['test'], 'test.png', { type: 'image/png' })
const testFileList = [testFile]

// 创建文件上传 DOM 事件
const createFileUploadEvent = (files: File[]) => {
    const event = {
        target: {
            files
        },
        preventDefault: jest.fn(),
        stopPropagation: jest.fn()
    } as unknown as React.ChangeEvent<HTMLInputElement>
    return event
}

// 创建基础组件属性
const baseProps: UploadProps = {
    action: 'https://test.com/upload',
    onSuccess: jest.fn(),
    onError: jest.fn(),
    onProgress: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn()
}

describe('测试 Upload 组件基本功能', () => {
    // 清除所有模拟
    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('应该正确渲染上传组件', () => {
        const { getByText, container } = render(<Upload {...baseProps}>上传文件</Upload>)

        // 上传按钮应该存在
        const uploadButton = getByText('上传文件')
        expect(uploadButton).toBeInTheDocument()

        // 文件输入框应该存在但不可见
        const fileInput = container.querySelector('.rainbow-ui-file-input')
        expect(fileInput).toBeInTheDocument()
        expect(fileInput).toHaveStyle('display: none')
    })

    it('点击按钮应该触发文件选择', () => {
        const { getByText, container } = render(<Upload {...baseProps}>上传文件</Upload>)

        const uploadButton = getByText('上传文件')
        const fileInput = container.querySelector('.rainbow-ui-file-input') as HTMLInputElement

        // 模拟点击文件输入框的旧方法
        const clickSpy = jest.spyOn(fileInput, 'click')

        // 点击上传按钮
        fireEvent.click(uploadButton)

        // 断言文件输入框被点击
        expect(clickSpy).toHaveBeenCalled()
    })

    it('选择文件后应上传', async () => {
        // 模拟成功响应
        mockedAxios.post.mockResolvedValueOnce({ data: '上传成功', status: 200 })

        const { container } = render(<Upload {...baseProps}>上传文件</Upload>)

        const fileInput = container.querySelector('.rainbow-ui-file-input') as HTMLInputElement

        // 触发文件选择
        fireEvent.change(fileInput, createFileUploadEvent(testFileList))

        // 文件应该出现在列表中
        await waitFor(() => {
            expect(screen.getByText('test.png')).toBeInTheDocument()
        })

        // Axios 应该被调用
        expect(mockedAxios.post).toHaveBeenCalledTimes(1)

        // 成功回调应该被调用
        await waitFor(() => {
            expect(baseProps.onSuccess).toHaveBeenCalled()
        })
    })

    it('上传失败时应调用错误回调', async () => {
        // 模拟失败响应
        mockedAxios.post.mockRejectedValueOnce(new Error('上传失败'))

        const { container } = render(<Upload {...baseProps}>上传文件</Upload>)

        const fileInput = container.querySelector('.rainbow-ui-file-input') as HTMLInputElement

        // 触发文件选择
        fireEvent.change(fileInput, createFileUploadEvent(testFileList))

        // 错误回调应该被调用
        await waitFor(() => {
            expect(baseProps.onError).toHaveBeenCalled()
        })
    })

    // 添加拖拽上传测试
    it('应支持拖拽上传', async () => {
        // 模拟成功响应
        mockedAxios.post.mockResolvedValueOnce({ data: '上传成功', status: 200 })

        // 渲染带拖拽功能的上传组件
        const { getByText } = render(
            <Upload {...baseProps} drag>
                <div>拖拽文件到此处上传</div>
            </Upload>
        )

        // 检查拖拽区域是否渲染
        const dragArea = getByText('拖拽文件到此处上传')
        expect(dragArea).toBeInTheDocument()

        // 模拟拖拽事件
        fireEvent.dragOver(dragArea)
        expect(dragArea.parentElement).toHaveClass('is-dragover')

        fireEvent.dragLeave(dragArea)
        expect(dragArea.parentElement).not.toHaveClass('is-dragover')

        // 模拟文件放下
        fireEvent.drop(dragArea, {
            dataTransfer: {
                files: testFileList
            }
        })

        // 验证文件上传
        await waitFor(() => {
            expect(mockedAxios.post).toHaveBeenCalled()
        })

        // 检查文件列表
        expect(await screen.findByText('test.png')).toBeInTheDocument()
    })
})
