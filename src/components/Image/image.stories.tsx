import type { Meta, StoryObj } from '@storybook/react';
import Image from './image';

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
import Image from 'rainbow-ui'
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

// 支持预览的图片
<Image
  src="https://example.com/image.jpg"
  alt="可预览图片"
  preview={true}
/>

// 设置不同的填充方式
<Image
  src="https://example.com/image.jpg"
  objectFit={Image.ObjectFit.Cover}
/>
\`\`\`
`,
            },
        },
    },
    argTypes: {
        src: {
            description: '图片源地址',
            type: { name: 'string', required: true },
            control: 'text',
        },
        alt: {
            description: '图片加载失败时的替代文本',
            control: 'text',
        },
        preview: {
            description: '是否启用预览功能',
            control: 'boolean',
            defaultValue: true,
        },
        lazy: {
            description: '图片懒加载',
            control: 'boolean',
        },
        width: {
            description: '图片宽度',
            control: 'text',
        },
        height: {
            description: '图片高度',
            control: 'text',
        },
        borderRadius: {
            description: '图片圆角',
            control: 'text',
        },
        objectFit: {
            description: '图片适应容器的方式',
            control: 'select',
            options: [
                Image.ObjectFit.Fill,
                Image.ObjectFit.Contain,
                Image.ObjectFit.Cover,
                Image.ObjectFit.None,
                Image.ObjectFit.ScaleDown,
            ],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Image>;

// 基础用法
export const Basic: Story = {
    name: '基础用法',
    args: {
        src: 'https://picsum.photos/600/400',
        alt: '示例图片',
        width: '100%',
        height: 300,
    },
};

// 带预览功能
export const WithPreview: Story = {
    name: '带预览功能',
    args: {
        src: 'https://picsum.photos/800/600',
        alt: '可预览图片',
        preview: true,
        width: '100%',
        height: 300,
    },
    parameters: {
        docs: {
            description: {
                story: '点击图片可以预览大图，支持缩放、旋转等操作。',
            },
        },
    },
};

// 懒加载功能
export const LazyLoading: Story = {
    name: '懒加载功能',
    args: {
        src: 'https://picsum.photos/700/500',
        alt: '懒加载图片',
        lazy: true,
        width: '100%',
        height: 300,
    },
    parameters: {
        docs: {
            description: {
                story: '设置 lazy 属性可以启用懒加载，图片只有进入视口范围内才会加载。',
            },
        },
    },
};

// 不同填充方式
export const DifferentObjectFit: Story = {
    name: '不同填充方式',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
                <h4>Cover（默认）- 覆盖，保持比例填充整个容器，可能裁剪</h4>
                <Image
                    src="https://picsum.photos/900/400"
                    alt="Cover模式"
                    objectFit={Image.ObjectFit.Cover}
                    width="100%"
                    height={200}
                    style={{ border: '1px solid #ddd' }}
                />
            </div>
            <div>
                <h4>Contain - 包含，完整显示图片，保持比例</h4>
                <Image
                    src="https://picsum.photos/400/900"
                    alt="Contain模式"
                    objectFit={Image.ObjectFit.Contain}
                    width="100%"
                    height={200}
                    style={{ border: '1px solid #ddd' }}
                />
            </div>
            <div>
                <h4>Fill - 填充，拉伸填满容器，可能变形</h4>
                <Image
                    src="https://picsum.photos/500/300"
                    alt="Fill模式"
                    objectFit={Image.ObjectFit.Fill}
                    width="100%"
                    height={200}
                    style={{ border: '1px solid #ddd' }}
                />
            </div>
            <div>
                <h4>None - 无，保持原始尺寸</h4>
                <Image
                    src="https://picsum.photos/300/200"
                    alt="None模式"
                    objectFit={Image.ObjectFit.None}
                    width="100%"
                    height={200}
                    style={{ border: '1px solid #ddd' }}
                />
            </div>
            <div>
                <h4>ScaleDown - 缩小，在None和Contain之间取最小的尺寸</h4>
                <Image
                    src="https://picsum.photos/1200/800"
                    alt="ScaleDown模式"
                    objectFit={Image.ObjectFit.ScaleDown}
                    width="100%"
                    height={200}
                    style={{ border: '1px solid #ddd' }}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '通过 objectFit 属性可以设置图片在容器中的填充方式，支持 cover、contain、fill、none、scale-down 等值。',
            },
        },
    },
};

// 错误处理和回退
export const Fallback: Story = {
    name: '错误处理和回退',
    render: () => (
        <div style={{ display: 'flex', gap: '20px' }}>
            <div>
                <h4>正常图片</h4>
                <Image
                    src="https://picsum.photos/400/300"
                    alt="正常图片"
                    width={200}
                    height={150}
                />
            </div>
            <div>
                <h4>加载失败（无效URL）</h4>
                <Image
                    src="https://invalid-url/image.jpg"
                    alt="无效图片"
                    width={200}
                    height={150}
                    fallback={
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <span role="img" aria-label="哭脸">😢</span>
                            <p>图片加载失败</p>
                        </div>
                    }
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '可以通过 fallback 属性设置图片加载失败时显示的内容。',
            },
        },
    },
};

// 图片组预览
export const PreviewGroup: Story = {
    name: '图片组预览',
    render: () => {
        // 图片数组
        const images = [
            'https://picsum.photos/id/1018/600/400',
            'https://picsum.photos/id/1015/600/400',
            'https://picsum.photos/id/1019/600/400',
            'https://picsum.photos/id/1016/600/400',
        ];

        return (
            <div>
                <h4>图片组预览（点击任意图片可切换预览）</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {images.map((src, index) => (
                        <Image
                            key={index}
                            src={src}
                            alt={`图片${index + 1}`}
                            width={150}
                            height={100}
                            style={{ objectFit: 'cover' }}
                            preview
                            previewGroup={{
                                images,
                                current: index,
                            }}
                        />
                    ))}
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: '使用 previewGroup 属性可以设置图片组预览，支持多张图片的切换预览。',
            },
        },
    },
};