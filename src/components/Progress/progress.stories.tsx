import type { Meta, StoryObj } from '@storybook/react';
import Progress from './progress';
import React from 'react';

// 组件文档信息
const meta: Meta<typeof Progress> = {
    title: 'Components/Progress 进度条',
    component: Progress,
    parameters: {
        layout: 'centered', // 全屏布局方式，居中
        docs: {
            description: {
                component: `
进度条组件，用于展示操作的当前进度。

## 引入方式

\`\`\`jsx
import { Progress } from 'rainbow-ui'
\`\`\`

## 基本用法

\`\`\`jsx
<Progress percent={60} />
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        percent: {
            description: '百分比',
            control: { type: 'number', min: 0, max: 100 },
            table: {
                type: { summary: 'number' },
            },
        },
        strokeHeight: {
            description: '进度条高度',
            control: { type: 'number', min: 1 },
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '15' },
            },
        },
        showText: {
            description: '是否显示进度文字',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        styles: {
            description: '自定义样式',
            control: 'object',
            table: {
                type: { summary: 'React.CSSProperties' },
            },
        },
        theme: {
            description: '进度条主题',
            control: 'select',
            options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger'],
            table: {
                type: { summary: "'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'" },
                defaultValue: { summary: 'primary' },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Progress>;

/**
 * 进度条组件
 * ## 引入Progress
 * ```jsx
 * import { Progress } from 'rainbow-ui'
 * ```
 * ## 使用Progress
 * ```jsx
 * <Progress percent={60} />
 * ```
 */

// 基础用法
export const Basic: Story = {
    name: '基础进度条',
    args: {
        percent: 60,
    },
    render: (args) => (
        <div style={{ width: '400px' }}>
            <Progress {...args} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '基础的进度条用法，设置 `percent` 指定进度百分比。',
            },
        },
    },
};

// 不同主题
export const Themes: Story = {
    name: '不同主题',
    args: {},
    render: () => (
        <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Progress percent={30} theme="primary" />
            <Progress percent={40} theme="secondary" />
            <Progress percent={50} theme="success" />
            <Progress percent={60} theme="info" />
            <Progress percent={70} theme="warning" />
            <Progress percent={80} theme="danger" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '进度条支持6种主题：primary、secondary、success、info、warning、danger，用于不同场景。',
            },
        },
    },
};

// 不同高度
export const Heights: Story = {
    name: '不同高度',
    args: {},
    render: () => (
        <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Progress percent={60} strokeHeight={8} />
            <Progress percent={60} strokeHeight={15} />
            <Progress percent={60} strokeHeight={25} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '通过设置 `strokeHeight` 可以指定进度条的高度，默认为15px。',
            },
        },
    },
};

// 是否显示文字
export const TextDisplay: Story = {
    name: '是否显示文字',
    args: {},
    render: () => (
        <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Progress percent={60} showText={true} />
            <Progress percent={60} showText={false} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '通过设置 `showText` 属性为 `false` 可以隐藏进度条文字。',
            },
        },
    },
};