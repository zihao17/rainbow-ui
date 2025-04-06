import React from 'react'
import { action } from '@storybook/addon-actions'
import { Upload } from './upload'
import { Meta, StoryObj } from '@storybook/react'

const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 500) {
        alert('the file is too big')
        return false;
    }
    return true;
}

// 定义组件元数据
export default {
    title: 'Components/Upload 上传',
    component: Upload,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
文件上传组件，支持多种自定义功能，如文件大小限制、文件重命名、自定义上传等。

## 引入方式

\`\`\`jsx
import { Upload } from 'rainbow-ui'
\`\`\`

## 基本用法

\`\`\`jsx
// 基础上传
<Upload
  action="https://your-api-url.com/upload"
  onChange={(file) => console.log(file)}
  onSuccess={(data, file) => console.log('上传成功', data, file)}
  onError={(err) => console.log('上传失败', err)}
/>

// 带文件验证的上传
<Upload
  action="https://your-api-url.com/upload"
  beforeUpload={(file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert('文件必须小于2MB!');
    }
    return isLt2M;
  }}
/>

// 文件拖拽上传
<Upload
  action="https://your-api-url.com/upload"
  drag
/>
\`\`\`
            `,
            },
        },
    },
} as Meta<typeof Upload>

// 定义故事类型
type Story = StoryObj<typeof Upload>

const filePromise = (file: File) => {
    console.log('原始文件名:', file.name);
    const newFile = new File([file], 'new_name.docx', { type: file.type });
    console.log('重命名后文件名:', newFile.name);
    return Promise.resolve(newFile);
}

// 基础上传组件故事
export const Default: Story = {
    render: () => (
        <Upload
            action='https://run.mocky.io/v3/a87d0888-2f52-4452-8d98-4fb923110b43'
            onChange={action('changed')}
        />
    )
}

// 带文件重命名的上传组件示例
export const WithFileRename: Story = {
    render: () => (
        <div>
            <h3>文件重命名示例</h3>
            <p>上传任意文件，会被重命名为 new_name.docx</p>
            <Upload
                action='https://run.mocky.io/v3/a87d0888-2f52-4452-8d98-4fb923110b43'
                onChange={(file) => console.log('上传的文件:', file.name)}
                beforeUpload={filePromise}
                onSuccess={(data, file) => console.log('上传成功，文件名:', file.name)}
            />
        </div>
    )
}
