import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Form from './form';
import Item from './formItem';
import Input from '../Input';
import Button, { ButtonType } from '../Button';

export default {
    title: 'Components/Form',
    id: 'Form',
    component: Form,
    subcomponents: { 'Item': Item }
} as Meta;

// 创建一个简单的表单Story
export const BasicForm: StoryFn = () => (
    <Form>
        <Item label="用户名" name='username'>
            <Input placeholder="请输入用户名" />
        </Item>
        <Item label="密码" name='password'>
            <Input type="password" placeholder="请输入密码" />
        </Item>
        <Item name='no-label'>
            <Input placeholder="no-label" />
        </Item>
        <div className='agreement-section' style={{ 'display': 'flex', 'alignItems': 'center', 'marginBottom': '10px' }}>
            <Item name='agreement'>
                <input type="checkbox" />
            </Item>
            <span className='agree-text'>注册及代表你同意<a href="#">《用户协议》</a></span>
        </div>
        <div className='rainbow-form-submit-area'>
            <Button type='submit' btnType={ButtonType.Primary}>提交</Button>
        </div>
    </Form>
);
