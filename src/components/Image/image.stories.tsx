import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Image, { ObjectFit } from './image';

const meta: Meta<typeof Image> = {
    title: 'Components/Image 图片',
    component: Image,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
图片组件，支持懒加载、预览、失败回退等功能。

## 引入方式

\`\`\`jsx
import { Image } from 'rainbow-ui'
\`\`\`

## 基本用法

\`\`\`jsx
// 基础图片
<Image
  src="https://example.com/image.jpg"
  alt="示例图片"
  width={500}
  height={300}
/>

// 带预览功能的图片
<Image
  src="https://example.com/image.jpg"
  alt="示例图片"
  preview={true}
/>

// 懒加载图片
<Image
  src="https://example.com/image.jpg"
  alt="示例图片"
  lazy={true}
/>
\`\`\`
            `,
            },
        },
    },
    argTypes: {
        src: {
            control: 'text',
            description: '图片源地址'
        },
        alt: {
            control: 'text',
            description: '图片的替代文本'
        },
        preview: {
            control: 'boolean',
            description: '是否启用预览功能'
        },
        lazy: {
            control: 'boolean',
            description: '是否启用懒加载'
        },
        width: {
            control: 'text',
            description: '图片宽度'
        },
        height: {
            control: 'text',
            description: '图片高度'
        },
        borderRadius: {
            control: 'text',
            description: '图片圆角'
        },
        objectFit: {
            control: { type: 'select', options: Object.values(ObjectFit) },
            description: '图片适应容器的方式'
        },
    },
};

export default meta;
type Story = StoryObj<typeof Image>;

// 基础图片展示
export const Default: Story = {
    args: {
        src: 'https://picsum.photos/500/300',
        alt: '示例图片',
        width: 500,
        height: 300
    }
};

// 不同尺寸的图片
export const DifferentSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Image
                src="https://picsum.photos/200/150"
                alt="小尺寸图片"
                width={200}
                height={150}
            />
            <Image
                src="https://picsum.photos/400/250"
                alt="中等尺寸图片"
                width={400}
                height={250}
            />
            <Image
                src="https://picsum.photos/600/350"
                alt="大尺寸图片"
                width={600}
                height={350}
            />
        </div>
    )
};

// 不同圆角图片
export const BorderRadius: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Image
                src="https://picsum.photos/300/200"
                alt="无圆角图片"
                width={300}
                height={200}
                borderRadius="0"
            />
            <Image
                src="https://picsum.photos/300/200"
                alt="小圆角图片"
                width={300}
                height={200}
                borderRadius="8px"
            />
            <Image
                src="https://picsum.photos/300/200"
                alt="中等圆角图片"
                width={300}
                height={200}
                borderRadius="16px"
            />
            <Image
                src="https://picsum.photos/300/200"
                alt="圆形图片"
                width={300}
                height={300}
                borderRadius="50%"
            />
        </div>
    )
};

// 不同填充方式
export const ObjectFitDemo: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h4>Fill</h4>
            <Image
                src="https://picsum.photos/800/300"
                alt="Fill示例"
                width={400}
                height={200}
                objectFit={ObjectFit.Fill}
            />
            <h4>Contain</h4>
            <Image
                src="https://picsum.photos/800/300"
                alt="Contain示例"
                width={400}
                height={200}
                objectFit={ObjectFit.Contain}
            />
            <h4>Cover</h4>
            <Image
                src="https://picsum.photos/800/300"
                alt="Cover示例"
                width={400}
                height={200}
                objectFit={ObjectFit.Cover}
            />
            <h4>None</h4>
            <Image
                src="https://picsum.photos/800/300"
                alt="None示例"
                width={400}
                height={200}
                objectFit={ObjectFit.None}
            />
            <h4>Scale Down</h4>
            <Image
                src="https://picsum.photos/800/300"
                alt="Scale Down示例"
                width={400}
                height={200}
                objectFit={ObjectFit.ScaleDown}
            />
        </div>
    )
};

// 失败状态图片
export const FailedImage: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Image
                src="https://invalid-image-url.jpg"
                alt="加载失败的图片"
                width={400}
                height={300}
            />
            <Image
                src="https://another-invalid-url.jpg"
                alt="自定义加载失败的图片"
                width={400}
                height={300}
                fallback={<div style={{ textAlign: 'center', color: 'red' }}>图片加载失败，请稍后重试</div>}
            />
        </div>
    )
};

// 懒加载图片
export const LazyLoadImages: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p>向下滚动查看懒加载图片</p>
            <div style={{ height: '500px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>滚动查看下方图片</span>
            </div>
            <Image
                src="https://picsum.photos/500/300?random=1"
                alt="懒加载图片1"
                width={500}
                height={300}
                lazy={true}
            />
            <div style={{ height: '500px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span>继续滚动查看更多图片</span>
            </div>
            <Image
                src="https://picsum.photos/500/300?random=2"
                alt="懒加载图片2"
                width={500}
                height={300}
                lazy={true}
            />
        </div>
    )
};

// 图片预览
export const PreviewDemo: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p>点击图片查看预览效果</p>
            <Image
                src="https://picsum.photos/800/500"
                alt="可预览图片"
                width={400}
                height={250}
                preview={true}
            />
        </div>
    )
};

// 图片组预览
export const PreviewGroupDemo: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <p style={{ width: '100%' }}>点击任意图片可查看预览，并可通过左右箭头切换图片</p>

            <Image
                src="https://picsum.photos/800/500?random=1"
                alt="图片组1"
                width={200}
                height={150}
                preview={true}
                previewGroup={{
                    images: [
                        "https://picsum.photos/800/500?random=1",
                        "https://picsum.photos/800/500?random=2",
                        "https://picsum.photos/800/500?random=3",
                        "https://picsum.photos/800/500?random=4"
                    ],
                    current: 0
                }}
            />

            <Image
                src="https://picsum.photos/800/500?random=2"
                alt="图片组2"
                width={200}
                height={150}
                preview={true}
                previewGroup={{
                    images: [
                        "https://picsum.photos/800/500?random=1",
                        "https://picsum.photos/800/500?random=2",
                        "https://picsum.photos/800/500?random=3",
                        "https://picsum.photos/800/500?random=4"
                    ],
                    current: 1
                }}
            />

            <Image
                src="https://picsum.photos/800/500?random=3"
                alt="图片组3"
                width={200}
                height={150}
                preview={true}
                previewGroup={{
                    images: [
                        "https://picsum.photos/800/500?random=1",
                        "https://picsum.photos/800/500?random=2",
                        "https://picsum.photos/800/500?random=3",
                        "https://picsum.photos/800/500?random=4"
                    ],
                    current: 2
                }}
            />

            <Image
                src="https://picsum.photos/800/500?random=4"
                alt="图片组4"
                width={200}
                height={150}
                preview={true}
                previewGroup={{
                    images: [
                        "https://picsum.photos/800/500?random=1",
                        "https://picsum.photos/800/500?random=2",
                        "https://picsum.photos/800/500?random=3",
                        "https://picsum.photos/800/500?random=4"
                    ],
                    current: 3
                }}
            />
        </div>
    )
};

// 自定义占位内容
export const CustomPlaceholder: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Image
                src="https://picsum.photos/800/500?delay=3000"
                alt="自定义加载占位图"
                width={400}
                height={250}
                placeholder={<div style={{ textAlign: 'center' }}>图片加载中...</div>}
            />
        </div>
    )
};