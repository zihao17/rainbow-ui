import type { Meta, StoryObj } from '@storybook/react';
import Transition from './transition';
import Button from '../Button/button';
import React, { useState } from 'react';

// 组件文档信息
const meta: Meta<typeof Transition> = {
    title: 'Components/Transition 过渡动画',
    component: Transition,
    parameters: {
        layout: 'centered', // 全屏布局方式，居中
        docs: {
            description: {
                component: `
过渡动画组件，基于 react-transition-group 实现，用于给元素添加进场和离场动画。

## 引入方式

\`\`\`jsx
import { Transition } from 'rainbow-ui'
\`\`\`

## 基本用法

\`\`\`jsx
const [show, setShow] = useState(false);

<Button onClick={() => setShow(!show)}>切换</Button>
<Transition
  in={show}
  timeout={300}
  animation="zoom-in-top"
>
  <div>内容区域</div>
</Transition>
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        animation: {
            description: '动画类型',
            control: 'select',
            options: ['zoom-in-top', 'zoom-in-left', 'zoom-in-bottom', 'zoom-in-right'],
            table: {
                type: { summary: 'AnimationName' },
            },
        },
        classNames: {
            description: '自定义类名',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        children: {
            description: '子元素',
            control: 'text',
            table: {
                type: { summary: 'React.ReactNode' },
            },
        },
        in: {
            description: '是否显示组件',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
            },
        },
        timeout: {
            description: '动画持续时间',
            control: 'number',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '300' },
            },
        },
        appear: {
            description: '是否在第一次挂载时使用动画',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        unmountOnExit: {
            description: '是否在退出时卸载组件',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Transition>;

/**
 * 过渡动画组件
 * ## 引入Transition
 * ```jsx
 * import { Transition } from 'rainbow-ui'
 * ```
 * ## 使用Transition
 * ```jsx
 * <Transition in={show} timeout={300} animation="zoom-in-top">
 *   <div>内容区域</div>
 * </Transition>
 * ```
 */

// 示例包装器，便于控制显示状态
const TransitionWrapper = (props: any) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <Button onClick={() => setShow(!show)} style={{ marginBottom: '10px' }}>
                {show ? '隐藏' : '显示'}
            </Button>
            <div style={{ height: '200px', position: 'relative' }}>
                <Transition in={show} timeout={300} {...props}>
                    <div style={{
                        backgroundColor: '#9c27b0',
                        color: 'white',
                        padding: '20px',
                        borderRadius: '4px',
                        position: 'absolute',
                        width: '200px',
                        textAlign: 'center',
                    }}>
                        动画内容
                    </div>
                </Transition>
            </div>
        </div>
    );
};

// 不同方向动画
export const Animations: Story = {
    name: '不同方向动画',
    args: {},
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '600px' }}>
            <div>
                <h3 style={{ marginBottom: '10px' }}>从顶部进入</h3>
                <TransitionWrapper animation="zoom-in-top" />
            </div>
            <div>
                <h3 style={{ marginBottom: '10px' }}>从左侧进入</h3>
                <TransitionWrapper animation="zoom-in-left" />
            </div>
            <div>
                <h3 style={{ marginBottom: '10px' }}>从底部进入</h3>
                <TransitionWrapper animation="zoom-in-bottom" />
            </div>
            <div>
                <h3 style={{ marginBottom: '10px' }}>从右侧进入</h3>
                <TransitionWrapper animation="zoom-in-right" />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '支持四种方向的进入动画：顶部进入、左侧进入、底部进入、右侧进入。',
            },
        },
    },
};

// 自定义时间
export const CustomTimeout: Story = {
    name: '自定义动画时间',
    args: {},
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '600px' }}>
            <div>
                <h3 style={{ marginBottom: '10px' }}>较快的动画 (200ms)</h3>
                <TransitionWrapper animation="zoom-in-top" timeout={200} />
            </div>
            <div>
                <h3 style={{ marginBottom: '10px' }}>正常动画 (300ms)</h3>
                <TransitionWrapper animation="zoom-in-top" timeout={300} />
            </div>
            <div>
                <h3 style={{ marginBottom: '10px' }}>较慢的动画 (800ms)</h3>
                <TransitionWrapper animation="zoom-in-top" timeout={800} />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: '可以通过设置 `timeout` 属性来自定义动画的时间。',
            },
        },
    },
};