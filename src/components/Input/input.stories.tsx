import { faEye, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { Meta, StoryFn } from '@storybook/react';
import Input from './input';

export default {
    title: 'Components/Input 输入框',
    component: Input,
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
输入框组件，支持不同尺寸、禁用状态、带图标、前缀/后缀等功能。

## 引入方式

\`\`\`jsx
import { Input } from 'rainbow-ui'
\`\`\`

## 基本用法

\`\`\`jsx
// 基础输入框
<Input placeholder="请输入内容" />

// 禁用状态
<Input disabled placeholder="禁用状态" />

// 带图标的输入框
<Input icon={faSearch} placeholder="搜索内容" />

// 带前缀后缀
<Input prepend="https://" append=".com" placeholder="请输入网站名称" />
\`\`\`
            `,
            },
        },
    },
    argTypes: {
        size: {
            options: ['lg', 'sm', undefined],
            control: { type: 'select' },
            description: '输入框大小，可选值为 lg 或 sm'
        },
        disabled: {
            control: 'boolean',
            description: '是否禁用输入框'
        },
        icon: {
            options: ['search', 'eye', 'user', undefined],
            control: { type: 'select' },
            description: '右侧图标',
            mapping: {
                search: faSearch,
                eye: faEye,
                user: faUser,
                undefined: undefined,
            }
        },
        placeholder: {
            control: 'text',
            description: '输入框占位文本'
        }
    },
} as Meta<typeof Input>;

// 基础输入框模板
const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

// 基础输入框
export const Default = Template.bind({});
Default.args = {
    placeholder: '请输入内容',
};
Default.storyName = '基础输入框';

// 禁用输入框
export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    placeholder: '禁用状态',
};
Disabled.storyName = '禁用状态';

// 带图标的输入框
export const WithIcon = Template.bind({});
WithIcon.args = {
    icon: faSearch,
    placeholder: '请输入搜索内容',
};
WithIcon.storyName = '带图标的输入框';

// 不同尺寸的输入框
export const DifferentSizes: StoryFn<typeof Input> = () => (
    <>
        <Input size={Input.Size.Large} placeholder="大尺寸输入框" style={{ marginBottom: '20px' }} />
        <Input placeholder="默认尺寸输入框" style={{ marginBottom: '20px' }} />
        <Input size={Input.Size.Small} placeholder="小尺寸输入框" />
    </>
);
DifferentSizes.storyName = '不同尺寸的输入框';

// 带前缀后缀的输入框
export const WithAffix: StoryFn<typeof Input> = () => (
    <>
        <Input prepend="https://" placeholder="请输入域名" style={{ marginBottom: '20px' }} />
        <Input append=".com" placeholder="请输入网站名称" style={{ marginBottom: '20px' }} />
        <Input prepend="https://" append=".com" placeholder="请输入网站名称" />
    </>
);
WithAffix.storyName = '带前缀后缀的输入框';

// 密码输入框
export const Password: StoryFn<typeof Input> = () => (
    <Input type="password" placeholder="请输入密码" icon={faEye} />
);
Password.storyName = '密码输入框';
