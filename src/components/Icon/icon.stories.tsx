import type { Meta, StoryObj } from '@storybook/react';
import Icon, { ThemeProps } from './icon';
import React from 'react';
import {
    faCheckSquare, faCoffee, faUser, faBars,
    faSearch, faHome, faHeart, faStar
} from '@fortawesome/free-solid-svg-icons';

// 组件文档信息
const meta: Meta<typeof Icon> = {
    title: 'Components/Icon 图标',
    component: Icon,
    parameters: {
        layout: 'centered', // 全屏布局方式，居中
        docs: {
            description: {
                component: `
图标组件，基于Font Awesome实现。

## 引入方式

\`\`\`jsx
import { Icon } from 'rainbow-ui'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
\`\`\`

## 基本用法

\`\`\`jsx
<Icon icon={faCheckSquare} theme="primary" />
<Icon icon={faCoffee} theme="danger" />
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        theme: {
            description: '设置图标主题颜色',
            control: 'select',
            options: ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'],
            table: {
                type: { summary: 'ThemeProps' },
                defaultValue: { summary: 'undefined' },
            },
        },
        icon: {
            description: 'Font Awesome图标',
            control: { type: 'object' },
            table: {
                type: { summary: 'IconDefinition' },
            },
        },
        className: {
            description: '额外的自定义类名',
            control: 'text',
        },
        size: {
            description: '图标大小',
            control: 'select',
            options: ['xs', 'sm', 'lg', '2x', '3x', '5x', '7x', '10x'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Icon>;

/**
 * 图标组件
 * ## 引入Icon
 * ```jsx
 * import { Icon } from 'rainbow-ui'
 * import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
 * ```
 * ## 使用Icon
 * ```jsx
 * <Icon icon={faCheckSquare} theme="primary" />
 * ```
 */

// 基础用法
export const Basic: Story = {
    name: '基础图标',
    args: {
        icon: faCoffee,
    },
    render: (args) => (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Icon {...args} />
            <Icon icon={faCheckSquare} />
            <Icon icon={faUser} />
            <Icon icon={faBars} />
            <Icon icon={faSearch} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '基础的图标使用，传入FontAwesome图标即可。',
            },
        },
    },
};

// 主题颜色
export const Themes: Story = {
    name: '主题颜色',
    args: {},
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Icon icon={faHome} theme="primary" />
            <Icon icon={faHome} theme="secondary" />
            <Icon icon={faHome} theme="success" />
            <Icon icon={faHome} theme="info" />
            <Icon icon={faHome} theme="warning" />
            <Icon icon={faHome} theme="danger" />
            <Icon icon={faHome} theme="light" />
            <Icon icon={faHome} theme="dark" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '图标支持8种主题颜色：primary、secondary、success、info、warning、danger、light、dark。',
            },
        },
    },
};

// 图标尺寸
export const Sizes: Story = {
    name: '图标尺寸',
    args: {},
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
            <Icon icon={faStar} size="xs" />
            <Icon icon={faStar} size="sm" />
            <Icon icon={faStar} />
            <Icon icon={faStar} size="lg" />
            <Icon icon={faStar} size="2x" />
            <Icon icon={faStar} size="3x" />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '图标支持多种尺寸，可以设置size属性为xs、sm、lg、2x、3x、5x、7x、10x等。',
            },
        },
    },
};

// 动画效果
export const Animation: Story = {
    name: '动画效果',
    args: {},
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Icon icon={faHeart} theme="danger" pulse />
            <Icon icon={faStar} theme="warning" spin />
            <Icon icon={faSearch} theme="primary" beat />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '图标支持多种动画效果，如pulse、spin、beat等。',
            },
        },
    },
};