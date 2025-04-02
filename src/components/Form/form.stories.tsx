import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Form, { FormItem } from './';
import Input from '../Input';
import Button from '../Button';

export default {
    title: 'Components/Form',
    component: Form,
    subcomponents: { FormItem }
} as Meta;

// 创建一个简单的表单Story
export const BasicForm: StoryFn = () => (
    <Form>
        <FormItem label="用户名">
            <Input placeholder="请输入用户名" />
        </FormItem>
        <FormItem label="密码">
            <Input type="password" placeholder="请输入密码" />
        </FormItem>
        <FormItem>
            <Button>提交</Button>
        </FormItem>
    </Form>
);
