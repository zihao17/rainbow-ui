import type { Meta, StoryObj } from '@storybook/react';
import Button, { ButtonType, ButtonSize, ButtonProps } from './button';
import React from 'react';

// 组件文档信息
const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        layout: 'centered', // 全屏布局方式，居中
        docs: {
            description: {
                component: `
按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

在 Rainbow UI 中，我们提供了五种按钮：

- 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- 默认按钮：用于没有主次之分的一组行动点。
- 危险按钮：用于警告用户该操作需要谨慎操作的用例。
- 链接按钮：用于作为外链的行动点。

以及三种尺寸：大、中、小。
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        btnType: {
            description: '设置按钮类型',
            control: 'select',
            options: [ButtonType.Default, ButtonType.Primary, ButtonType.Warning, ButtonType.Danger, ButtonType.Link],
            table: {
                type: { summary: 'ButtonType' },
                defaultValue: { summary: 'Default' },
            },
        },
        size: {
            description: '设置按钮大小',
            control: 'select',
            options: [ButtonSize.Large, ButtonSize.Middle, ButtonSize.Small],
            table: {
                type: { summary: 'ButtonSize' },
                defaultValue: { summary: 'Middle' },
            },
        },
        disabled: {
            description: '按钮失效状态',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        href: {
            description: '点击跳转的地址，指定此属性 button 的行为和 a 链接一致',
            control: 'text',
            if: { arg: 'btnType', eq: ButtonType.Link },
        },
        className: {
            description: '额外的自定义类名',
            control: 'text',
        },
        children: {
            description: '按钮内容',
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * 按钮组件
 * ## 引入Button
 * ~~~js
 * import { Button } form 'rainbow-ui'
 * ~~~
 * ## 使用Button
 * ~~~js
 * <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>按钮</Button>
 */

// 基础用法
export const Basic: Story = {
    args: {
        children: '默认按钮',
    },
    render: (args) => (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Button {...args}>默认按钮</Button>
            <Button btnType={ButtonType.Primary}>主要按钮</Button>
            <Button btnType={ButtonType.Warning}>警告按钮</Button>
            <Button btnType={ButtonType.Danger}>危险按钮</Button>
            <Button btnType={ButtonType.Link} href="https://example.com">链接按钮</Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '按钮有四种类型：默认按钮、主按钮、危险按钮和链接按钮。',
            },
        },
    },
};

// 按钮尺寸
export const Sizes: Story = {
    args: {},
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button size={ButtonSize.Large}>大号按钮</Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>大号主按钮</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button>默认按钮</Button>
                <Button btnType={ButtonType.Primary}>默认主按钮</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button size={ButtonSize.Small}>小号按钮</Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Small}>小号主按钮</Button>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '按钮有大、中、小三种尺寸。通过设置 `size` 为 `large` `small` 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。',
            },
        },
    },
};

// 禁用状态
export const Disabled: Story = {
    args: {
        disabled: true,
    },
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button disabled>默认按钮(禁用)</Button>
                <Button btnType={ButtonType.Primary} disabled>主要按钮(禁用)</Button>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button btnType={ButtonType.Warning} disabled>警告按钮(禁用)</Button>
                <Button btnType={ButtonType.Danger} disabled>危险按钮(禁用)</Button>
                <Button btnType={ButtonType.Link} href="https://example.com" disabled>链接按钮(禁用)</Button>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '按钮的禁用状态。添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变。',
            },
        },
    },
};

// 加载中状态
export const Loading: Story = {
    args: {},
    render: () => (
        <div style={{ display: 'flex', gap: '10px' }}>
            <Button btnType={ButtonType.Primary} disabled>
                <span style={{ marginRight: '8px' }}>&#8635;</span>
                加载中
            </Button>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '**注意：** 这是一个示例，您的组件目前没有内置loading状态。您可以扩展组件添加loading功能。',
            },
        },
    },
};

// 组合使用
export const ButtonGroups: Story = {
    args: {},
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '0' }}>
                <Button>左</Button>
                <Button>中</Button>
                <Button>右</Button>
            </div>
            <div style={{ display: 'flex', gap: '0' }}>
                <Button btnType={ButtonType.Primary}>左</Button>
                <Button btnType={ButtonType.Primary}>中</Button>
                <Button btnType={ButtonType.Primary}>右</Button>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '按钮组合使用示例。您可以考虑添加ButtonGroup组件来更好地支持这一功能。',
            },
        },
    },
};
