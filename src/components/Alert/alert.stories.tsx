import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Alert, { AlertType, AlertProps } from './alert';
import Button, { ButtonType, ButtonSize } from '../Button/button';
import React from 'react';

// 组件文档信息
const meta: Meta<typeof Alert> = {
    title: 'Components/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
# Alert 组件 - 用于页面中展示重要的提示信息。
## 引入方式

\`\`\`jsx
import { Button } from 'rainbow-ui'
\`\`\`

## 基本用法

\`\`\`jsx
const [showBasicAlert, setShowBasicAlert] = useState(false);

<Button btnType={ButtonType.Primary} onClick={() => setShowBasicAlert(true)}>显示基础 Alert</Button>

{showBasicAlert && (
    <Alert title="标题" description="内容" type={AlertType.Success} onClose={() => setShowBasicAlert(false)} />
    )
}
\`\`\`
## 特点

- 支持四种不同类型的信息展示：成功、默认（信息）、警告、错误。
- 可自定义关闭按钮与关闭回调。
- 支持自动关闭的定时器设置。
- 支持标题与详细描述文本。
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            description: '指定警告提示的样式',
            control: 'select',
            options: [AlertType.Default, AlertType.Success, AlertType.Warning, AlertType.Danger],
            table: {
                type: { summary: 'AlertType' },
                defaultValue: { summary: 'Default' },
            },
        },
        title: {
            description: '警告提示的标题',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        description: {
            description: '警告提示的详细描述',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
        closable: {
            description: '是否显示关闭按钮',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        duration: {
            description: '自动关闭的延时，单位毫秒，设为 0 则不自动关闭',
            control: 'number',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '3000' },
            },
        },
        onClose: {
            description: '关闭时触发的回调函数',
            action: 'closed',
            table: {
                type: { summary: '() => void' },
            },
        },
        className: {
            description: '自定义CSS类名',
            control: 'text',
            table: {
                type: { summary: 'string' },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Alert>;

// 交互式展示（通过Button触发Alert）
export const InteractiveDemo: Story = {
    args: {
        description: '3',
        duration: 3,
    },
    render: () => {
        const AlertDemo = () => {
            const [alerts, setAlerts] = useState<Array<{ id: number; props: AlertProps }>>([]);
            let nextId = 0;

            const addAlert = (type: AlertType, title: string) => {
                const id = nextId++;
                setAlerts([
                    ...alerts,
                    {
                        id,
                        props: {
                            type,
                            title,
                            description: `这是一个${title}，ID为: ${id}`,
                            duration: 0,
                            onClose: () => {
                                setAlerts(alerts.filter(alert => alert.id !== id));
                            },
                        },
                    },
                ]);
            };

            return (
                <div>
                    <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
                        <Button
                            btnType={ButtonType.Default}
                            onClick={() => addAlert(AlertType.Default, '信息提示')}
                        >
                            显示信息
                        </Button>
                        <Button
                            btnType={ButtonType.Primary}
                            onClick={() => addAlert(AlertType.Success, '成功提示')}
                        >
                            显示成功
                        </Button>
                        <Button
                            btnType={ButtonType.Warning}
                            onClick={() => addAlert(AlertType.Warning, '警告提示')}
                        >
                            显示警告
                        </Button>
                        <Button
                            btnType={ButtonType.Danger}
                            onClick={() => addAlert(AlertType.Danger, '错误提示')}
                        >
                            显示错误
                        </Button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
                        {alerts.map(alert => (
                            <Alert key={alert.id} {...alert.props} />
                        ))}
                    </div>
                </div>
            );
        };

        return <AlertDemo />;
    },
    parameters: {
        docs: {
            description: {
                story:
                    '这个示例展示了如何通过按钮交互创建不同类型的Alert提示。点击按钮后会添加一个新的Alert，而且每个Alert都不会自动关闭，它们会保持在页面上直到用户手动关闭。',
            },
        },
    },
};

// 表单提交场景
export const FormSubmitDemo: Story = {
    args: {},
    render: () => {
        const FormDemo = () => {
            const [name, setName] = useState('');
            const [email, setEmail] = useState('');
            const [showSuccess, setShowSuccess] = useState(false);
            const [showError, setShowError] = useState(false);
            const [errorMessage, setErrorMessage] = useState('');

            const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();

                // 简单验证
                if (!name.trim() || !email.trim()) {
                    setErrorMessage('姓名和邮箱不能为空');
                    setShowError(true);
                    setShowSuccess(false);
                    return;
                }

                if (!email.includes('@')) {
                    setErrorMessage('请输入有效的邮箱地址');
                    setShowError(true);
                    setShowSuccess(false);
                    return;
                }

                // 提交成功
                setShowSuccess(true);
                setShowError(false);
                // 模拟表单提交后清空
                setName('');
                setEmail('');
            };

            return (
                <div style={{ maxWidth: '600px' }}>
                    <form style={{ marginBottom: '16px' }} onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px' }}>姓名：</label>
                            <input
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #d9d9d9',
                                }}
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="输入为空则会提示错误"
                            />
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <label style={{ display: 'block', marginBottom: '4px' }}>密码：</label>
                            <input
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #d9d9d9',
                                }}
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="输入为空则会提示错误"
                            />
                        </div>
                        <Button btnType={ButtonType.Primary} size={ButtonSize.Middle} type="submit">
                            提交表单
                        </Button>
                    </form>

                    {showSuccess && (
                        <Alert
                            title="提交成功"
                            description="您的表单已成功提交，我们会尽快处理您的请求。"
                            type={AlertType.Success}
                            closable={true}
                            onClose={() => setShowSuccess(false)}
                            duration={0}
                        />
                    )}

                    {showError && (
                        <Alert
                            title="提交失败"
                            description={errorMessage}
                            type={AlertType.Danger}
                            closable={true}
                            onClose={() => setShowError(false)}
                            duration={0}
                        />
                    )}
                </div>
            );
        };

        return <FormDemo />;
    },
    parameters: {
        docs: {
            description: {
                story:
                    '这个示例展示了在表单提交场景中使用Alert组件的方式。当表单验证失败时会显示错误提示，提交成功时会显示成功提示。',
            },
        },
    },
};
