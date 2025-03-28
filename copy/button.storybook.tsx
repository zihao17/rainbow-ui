import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonType, ButtonSize } from './button';
import { CodeBlock } from '@storybook/blocks';

// 组件文档信息
const meta: Meta<typeof Button> = {
    title: 'Components/ButtonUsage',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
# Rainbow UI 按钮组件使用指南

本页面提供了Rainbow UI按钮组件的使用示例和代码片段，方便您在项目中快速使用。

## 安装

首先确保已安装Rainbow UI：

\`\`\`bash
npm install rainbow-ui
\`\`\`

或

\`\`\`bash
yarn add rainbow-ui
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

// 基础用法示例
export const BasicUsage: Story = {
    args: {},
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3>组件引入</h3>
            <CodeBlock language="tsx">{`import { Button, ButtonType, ButtonSize } from 'rainbow-ui'`}</CodeBlock>

            <h3>组件使用</h3>
            <CodeBlock language="tsx">{`<Button btnType={ButtonType.Primary} size={ButtonSize.Large}>按钮</Button>`}</CodeBlock>

            <h3>效果预览</h3>
            <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>按钮</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '复制上面的代码可以在您的项目中使用Rainbow UI的按钮组件。',
            },
        },
    },
};

// 所有按钮类型
export const ButtonTypes: Story = {
    args: {},
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3>不同类型按钮</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button>默认按钮</Button>
                <Button btnType={ButtonType.Primary}>主要按钮</Button>
                <Button btnType={ButtonType.Warning}>警告按钮</Button>
                <Button btnType={ButtonType.Danger}>危险按钮</Button>
                <Button btnType={ButtonType.Link} href="https://example.com">链接按钮</Button>
            </div>

            <h3>代码示例</h3>
            <CodeBlock language="tsx">{`// 默认按钮
<Button>默认按钮</Button>

// 主要按钮
<Button btnType={ButtonType.Primary}>主要按钮</Button>

// 警告按钮
<Button btnType={ButtonType.Warning}>警告按钮</Button>

// 危险按钮
<Button btnType={ButtonType.Danger}>危险按钮</Button>

// 链接按钮
<Button btnType={ButtonType.Link} href="https://example.com">链接按钮</Button>`}</CodeBlock>
        </div>
    ),
};

// 按钮尺寸
export const ButtonSizes: Story = {
    args: {},
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3>不同尺寸按钮</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>大号按钮</Button>
                <Button btnType={ButtonType.Primary}>中号按钮</Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>小号按钮</Button>
            </div>

            <h3>代码示例</h3>
            <CodeBlock language="tsx">{`// 大号按钮
<Button btnType={ButtonType.Primary} size={ButtonSize.Large}>大号按钮</Button>

// 中号按钮（默认）
<Button btnType={ButtonType.Primary}>中号按钮</Button>

// 小号按钮
<Button btnType={ButtonType.Primary} size={ButtonSize.Small}>小号按钮</Button>`}</CodeBlock>
        </div>
    ),
};

// 禁用状态
export const DisabledButtons: Story = {
    args: {},
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3>禁用状态按钮</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button disabled>默认禁用</Button>
                <Button btnType={ButtonType.Primary} disabled>主要禁用</Button>
            </div>

            <h3>代码示例</h3>
            <CodeBlock language="tsx">{`// 禁用默认按钮
<Button disabled>默认禁用</Button>

// 禁用主要按钮
<Button btnType={ButtonType.Primary} disabled>主要禁用</Button>`}</CodeBlock>
        </div>
    ),
};