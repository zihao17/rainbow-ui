import type { Meta, StoryObj } from '@storybook/react';
import Select, { SelectMode, SelectProps } from './select';
import React from 'react';

// 组件文档信息
const meta: Meta<typeof Select> = {
    title: 'Components/Select 选择器',
    component: Select,
    parameters: {
        layout: 'centered', // 全屏布局方式，居中
        docs: {
            description: {
                component: `
下拉选择器组件，用于替代原生选择器或实现优雅的多选功能。

## 引入方式

\`\`\`jsx
import { Select } from 'rainbow-ui'
\`\`\`

## 基本用法

\`\`\`jsx
<Select
  options={[
    { value: 'option1', label: '选项一' },
    { value: 'option2', label: '选项二' }
  ]}
  placeholder="请选择"
/>
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        mode: {
            description: '设置选择器模式',
            control: 'select',
            options: [SelectMode.Single, SelectMode.Multiple],
            table: {
                type: { summary: 'SelectMode' },
                defaultValue: { summary: 'Single' },
            },
        },
        options: {
            description: '下拉选项数据',
            control: 'object',
            table: {
                type: { summary: 'SelectOptionProps[]' },
            },
        },
        defaultValue: {
            description: '默认选中的选项',
            control: 'text',
            table: {
                type: { summary: 'string | string[]' },
            },
        },
        disabled: {
            description: '是否禁用选择器',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        placeholder: {
            description: '选择框默认文本',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        size: {
            description: '选择器大小',
            control: 'select',
            options: ['large', 'middle', 'small'],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'middle' },
            },
        },
        width: {
            description: '选择器宽度',
            control: 'number',
            table: {
                type: { summary: 'number' },
            },
        },
        onChange: {
            description: '选择时的回调',
            table: {
                type: { summary: '(value: string | string[], selectedOptions: SelectOptionProps | SelectOptionProps[]) => void' },
            },
        },
        onVisibleChange: {
            description: '下拉菜单显示隐藏的回调',
            table: {
                type: { summary: '(visible: boolean) => void' },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Select>;

const defaultOptions = [
    { value: 'option1', label: '选项一' },
    { value: 'option2', label: '选项二' },
    { value: 'option3', label: '选项三' },
    { value: 'option4', label: '选项四' },
    { value: 'option5', label: '选项五' },
];

// 基础用法
export const BasicSelect: Story = {
    name: '基础单选',
    args: {
        options: defaultOptions,
        placeholder: '请选择',
        width: 300,
    },
    render: (args) => (
        <Select {...args} />
    ),
    parameters: {
        docs: {
            description: {
                story: '基础的单选下拉选择器。',
            },
        },
    },
};

// 默认选中
export const DefaultSelected: Story = {
    name: '默认选中',
    args: {
        options: defaultOptions,
        defaultValue: 'option2',
        width: 300,
    },
    render: (args) => (
        <Select {...args} />
    ),
    parameters: {
        docs: {
            description: {
                story: '可以通过 defaultValue 指定默认选中的选项。',
            },
        },
    },
};

// 禁用选择器
export const DisabledSelect: Story = {
    name: '禁用选择器',
    args: {
        options: defaultOptions,
        disabled: true,
        defaultValue: 'option1',
        width: 300,
    },
    render: (args) => (
        <Select {...args} />
    ),
    parameters: {
        docs: {
            description: {
                story: '禁用整个选择器。',
            },
        },
    },
};

// 禁用选项
export const DisabledOption: Story = {
    name: '禁用选项',
    args: {
        options: [
            { value: 'option1', label: '选项一' },
            { value: 'option2', label: '选项二', disabled: true },
            { value: 'option3', label: '选项三' },
            { value: 'option4', label: '选项四', disabled: true },
            { value: 'option5', label: '选项五' },
        ],
        width: 300,
    },
    render: (args) => (
        <Select {...args} />
    ),
    parameters: {
        docs: {
            description: {
                story: '可以禁用选择器中的某些选项。',
            },
        },
    },
};

// 不同尺寸
export const DifferentSizes: Story = {
    name: '不同尺寸',
    args: {
        options: defaultOptions,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
            <Select options={defaultOptions} placeholder="大号选择器" size="large" />
            <Select options={defaultOptions} placeholder="默认选择器" />
            <Select options={defaultOptions} placeholder="小号选择器" size="small" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '选择器有大、中、小三种尺寸。通过设置 `size` 为 `large` `small` 分别把选择器设为大、小尺寸。若不设置 `size`，则尺寸为中。',
            },
        },
    },
};

// 多选模式
export const MultipleSelect: Story = {
    name: '多选模式',
    args: {
        options: defaultOptions,
        mode: SelectMode.Multiple,
        width: 300,
        placeholder: '请选择多个选项',
    },
    render: (args) => (
        <Select {...args} />
    ),
    parameters: {
        docs: {
            description: {
                story: '设置 `mode` 为 `multiple` 开启多选模式。多选模式下，选中项会以标签的形式展示，可以点击标签的删除图标删除选项。',
            },
        },
    },
};

// 默认选中多项
export const DefaultMultipleSelected: Story = {
    name: '默认选中多项',
    args: {
        options: defaultOptions,
        mode: SelectMode.Multiple,
        defaultValue: ['option1', 'option3'],
        width: 300,
    },
    render: (args) => (
        <Select {...args} />
    ),
    parameters: {
        docs: {
            description: {
                story: '多选模式下，可以通过 defaultValue 指定默认选中的多个选项。',
            },
        },
    },
};

// 事件回调
export const EventCallbacks: Story = {
    name: '事件回调',
    args: {
        options: defaultOptions,
        width: 300,
        placeholder: '带回调的选择器',
    },
    render: (args) => (
        <Select
            {...args}
            onChange={(value, selected) => {
                console.log('选中值变化:', value);
                console.log('选中选项:', selected);
                alert(`选中值: ${value}`);
            }}
            onVisibleChange={(visible) => {
                console.log('下拉菜单状态:', visible ? '显示' : '隐藏');
            }}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: '通过 onChange 和 onVisibleChange 回调可以监听选择器的值变化和展开状态变化。',
            },
        },
    },
};