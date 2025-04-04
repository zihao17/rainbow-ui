import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Input, InputProps } from './input';
import { faSearch, faEye, faUser } from '@fortawesome/free-solid-svg-icons';

export default {
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs'],
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
} as Meta<InputProps>;

// 基础输入框模板
const Template: StoryFn<InputProps> = (args: InputProps) => <Input {...args} />;

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
export const DifferentSizes: StoryFn<InputProps> = () => (
    <>
        <Input size="lg" placeholder="大尺寸输入框" style={{ marginBottom: '20px' }} />
        <Input placeholder="默认尺寸输入框" style={{ marginBottom: '20px' }} />
        <Input size="sm" placeholder="小尺寸输入框" />
    </>
);
DifferentSizes.storyName = '不同尺寸的输入框';

// 带前缀后缀的输入框
export const WithAffix: StoryFn<InputProps> = () => (
    <>
        <Input prepend="https://" placeholder="请输入域名" style={{ marginBottom: '20px' }} />
        <Input append=".com" placeholder="请输入网站名称" style={{ marginBottom: '20px' }} />
        <Input prepend="https://" append=".com" placeholder="请输入网站名称" />
    </>
);
WithAffix.storyName = '带前缀后缀的输入框';

// 密码输入框
export const Password: StoryFn<InputProps> = () => (
    <Input type="password" placeholder="请输入密码" icon={faEye} />
);
Password.storyName = '密码输入框';
