import type { Meta, StoryObj } from '@storybook/react';
import Paginator, { PaginatorSize, PaginatorTheme } from './paginator';
import React from 'react';

// 组件文档信息
const meta: Meta<typeof Paginator> = {
    title: 'Components/Paginator 分页器',
    component: Paginator,
    parameters: {
        layout: 'centered', // 全屏布局方式，居中
        docs: {
            description: {
                component: `
分页器组件，用于有大量内容需要分页展示的场景。

## 引入方式

\`\`\`jsx
import { Paginator, PaginatorSize, PaginatorTheme } from 'rainbow-ui'
\`\`\`

## 基本用法

\`\`\`jsx
<Paginator
  total={100}
  current={1}
  pageSize={10}
  onChange={(page, pageSize) => console.log(page, pageSize)}
/>
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        current: {
            description: '当前页码，从1开始',
            control: { type: 'number', min: 1 },
            table: {
                type: { summary: 'number' },
            },
        },
        defaultCurrent: {
            description: '默认的当前页码',
            control: { type: 'number', min: 1 },
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '1' },
            },
        },
        total: {
            description: '数据总数',
            control: { type: 'number', min: 0 },
            table: {
                type: { summary: 'number' },
            },
        },
        pageSize: {
            description: '每页条目数',
            control: { type: 'number', min: 1 },
            table: {
                type: { summary: 'number' },
            },
        },
        defaultPageSize: {
            description: '默认的每页条目数',
            control: { type: 'number', min: 1 },
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '10' },
            },
        },
        onChange: {
            description: '页码改变的回调函数',
            action: 'changed',
            table: {
                type: { summary: '(page: number, pageSize: number) => void' },
            },
        },
        disabled: {
            description: '是否禁用',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        size: {
            description: '分页器尺寸',
            control: 'select',
            options: [PaginatorSize.Small, PaginatorSize.Medium, PaginatorSize.Large],
            table: {
                type: { summary: 'PaginatorSize' },
                defaultValue: { summary: 'Medium' },
            },
        },
        theme: {
            description: '分页器主题风格',
            control: 'select',
            options: [PaginatorTheme.Colorful, PaginatorTheme.Simple],
            table: {
                type: { summary: 'PaginatorTheme' },
                defaultValue: { summary: 'Colorful' },
            },
        },
        showQuickJumper: {
            description: '是否显示快速跳转',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        hideOnSinglePage: {
            description: '只有一页时是否隐藏分页器',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        showPageCount: {
            description: '页码按钮的数量，当总页数超过此值时会折叠',
            control: { type: 'number', min: 3 },
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '5' },
            },
        },
        className: {
            description: '自定义类名',
            control: 'text',
        },
        showTotal: {
            description: '是否显示总数',
            control: 'boolean',
            table: {
                type: { summary: '(total: number, range: [number, number]) => React.ReactNode' },
            },
        },
        showFirstLastButtons: {
            description: '是否显示跳转到首页和尾页的按钮',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Paginator>;

/**
 * 分页器组件
 * ## 引入Paginator
 * ```jsx
 * import { Paginator, PaginatorSize, PaginatorTheme } from 'rainbow-ui'
 * ```
 * ## 使用Paginator
 * ```jsx
 * <Paginator
 *   total={100}
 *   current={1}
 *   pageSize={10}
 *   onChange={(page, pageSize) => console.log(page, pageSize)}
 * />
 * ```
 */

// 基础用法
export const Basic: Story = {
    name: '基础分页',
    args: {
        total: 100,
        defaultCurrent: 1,
        defaultPageSize: 10,
    },
    render: (args) => (
        <Paginator {...args} />
    ),
    parameters: {
        docs: {
            description: {
                story: '基础的分页器用法，设置 `total` 指定总记录数，设置 `defaultCurrent` 指定默认当前页。',
            },
        },
    },
};

// 分页器尺寸
export const Sizes: Story = {
    name: '分页器尺寸',
    args: {
        total: 100,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Paginator total={100} size={PaginatorSize.Small} />
            <Paginator total={100} size={PaginatorSize.Medium} />
            <Paginator total={100} size={PaginatorSize.Large} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '分页器有小、中、大三种尺寸。通过设置 `size` 属性为 `PaginatorSize.Small`、`PaginatorSize.Medium`、`PaginatorSize.Large` 分别把分页器设为小、中、大尺寸。若不设置 `size`，则尺寸为中。',
            },
        },
    },
};

// 主题风格
export const Themes: Story = {
    name: '主题风格',
    args: {
        total: 100,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Paginator total={100} theme={PaginatorTheme.Colorful} />
            <Paginator total={100} theme={PaginatorTheme.Simple} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '分页器支持多彩(colorful)和简约(simple)两种风格，默认为多彩风格。',
            },
        },
    },
};

// 更多功能
export const Advanced: Story = {
    name: '更多功能',
    args: {
        total: 500,
        showQuickJumper: true,
        showFirstLastButtons: true,
        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`,
    },
    render: (args) => (
        <Paginator {...args} />
    ),
    parameters: {
        docs: {
            description: {
                story: '更复杂的分页器，包括显示总数、快速跳转、首尾页按钮等功能。',
            },
        },
    },
};

// 禁用状态
export const Disabled: Story = {
    name: '禁用状态',
    args: {
        total: 100,
        disabled: true,
    },
    render: (args) => (
        <Paginator {...args} />
    ),
    parameters: {
        docs: {
            description: {
                story: '禁用状态的分页器。',
            },
        },
    },
};