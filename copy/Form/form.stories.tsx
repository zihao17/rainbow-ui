import React, { useRef } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Form, { FormInstance } from './form';
import Item from './formItem';
import Input from '../../src/components/Input';
import Button, { ButtonType } from '../../src/components/Button';
import Select from '../../src/components/Select';

export default {
    title: 'Components/Form',
    id: 'Form',
    component: Form,
    subcomponents: { 'Item': Item }
} as Meta;

// 创建一个简单的表单Story
export const BasicForm: StoryFn = () => {
    const handleFinish = (values: Record<string, any>) => {
        console.log('表单提交成功:', values);
        alert('表单提交成功: ' + JSON.stringify(values));
    };

    const handleFinishFailed = (errorInfo: any) => {
        console.log('表单提交失败:', errorInfo);
    };

    return (
        <Form
            name="basic-form"
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
        >
            <Item
                label="用户名"
                name='username'
                rules={[
                    { required: true, message: '请输入用户名' },
                    { min: 3, max: 20, message: '用户名长度为3-20个字符' }
                ]}
            >
                <Input placeholder="请输入用户名" />
            </Item>
            <Item
                label="密码"
                name='password'
                rules={[
                    { required: true, message: '请输入密码' },
                    { min: 6, message: '密码长度至少为6个字符' }
                ]}
            >
                <Input type="password" placeholder="请输入密码" />
            </Item>
            <Item name='no-label'>
                <Input placeholder="无标签字段" />
            </Item>
            <div className='agreement-section' style={{ 'display': 'flex', 'alignItems': 'center', 'marginBottom': '10px' }}>
                <Item name='agreement' valuePropName="checked" rules={[{ required: true, message: '请同意用户协议' }]}>
                    <input type="checkbox" />
                </Item>
                <span className='agree-text'>注册及代表你同意<a href="#">《用户协议》</a></span>
            </div>
            <div className='rainbow-form-submit-area'>
                <Button type="submit" btnType={ButtonType.Primary}>提交</Button>
            </div>
        </Form>
    );
};

// 不同布局的表单示例
export const FormLayouts: StoryFn = () => {
    return (
        <>
            <h3>水平布局</h3>
            <Form layout="horizontal">
                <Item label="字段1" name='field1'>
                    <Input placeholder="水平布局字段1" />
                </Item>
                <Item label="字段2" name='field2'>
                    <Input placeholder="水平布局字段2" />
                </Item>
            </Form>

            <h3>垂直布局</h3>
            <Form layout="vertical">
                <Item label="字段1" name='field1'>
                    <Input placeholder="垂直布局字段1" />
                </Item>
                <Item label="字段2" name='field2'>
                    <Input placeholder="垂直布局字段2" />
                </Item>
            </Form>

            <h3>内联布局</h3>
            <Form layout="inline">
                <Item label="字段1" name='field1'>
                    <Input placeholder="内联布局字段1" />
                </Item>
                <Item label="字段2" name='field2'>
                    <Input placeholder="内联布局字段2" />
                </Item>
                <Item name='submit-button'>
                    <Button btnType={ButtonType.Primary}>查询</Button>
                </Item>
            </Form>
        </>
    );
};

// 表单实例方法示例
export const FormMethods: StoryFn = () => {
    const formRef = useRef<FormInstance>(null);

    const handleReset = () => {
        formRef.current?.resetFields();
    };

    const handleFill = () => {
        formRef.current?.setFieldsValue({
            username: '测试用户',
            email: 'test@example.com'
        });
    };

    const handleValidate = () => {
        formRef.current?.validateFields()
            .then(values => {
                console.log('校验成功:', values);
                alert('校验成功: ' + JSON.stringify(values));
            })
            .catch(err => {
                console.log('校验失败:', err);
                alert('校验失败，请检查表单填写');
            });
    };

    return (
        <Form ref={formRef} name="form-methods">
            <Item
                label="用户名"
                name='username'
                rules={[{ required: true, message: '请输入用户名' }]}
            >
                <Input placeholder="请输入用户名" />
            </Item>
            <Item
                label="邮箱"
                name='email'
                rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' }
                ]}
            >
                <Input placeholder="请输入邮箱" />
            </Item>
            <div className='rainbow-form-submit-area'>
                <Button onClick={handleValidate} btnType={ButtonType.Primary} style={{ marginRight: '8px' }}>验证</Button>
                <Button onClick={handleFill} btnType={ButtonType.Default} style={{ marginRight: '8px' }}>填充</Button>
                <Button onClick={handleReset} btnType={ButtonType.Danger}>重置</Button>
            </div>
        </Form>
    );
};

// 自定义验证规则示例
export const CustomValidation: StoryFn = () => {
    // 自定义验证函数
    const validatePassword = (value: any) => {
        if (!value) {
            return Promise.reject('请输入密码');
        }
        if (!/[A-Z]/.test(value)) {
            return Promise.reject('密码必须包含至少一个大写字母');
        }
        if (!/[a-z]/.test(value)) {
            return Promise.reject('密码必须包含至少一个小写字母');
        }
        if (!/[0-9]/.test(value)) {
            return Promise.reject('密码必须包含至少一个数字');
        }
        if (value.length < 8) {
            return Promise.reject('密码长度至少为8个字符');
        }
        return Promise.resolve();
    };

    return (
        <Form name="custom-validation">
            <Item
                label="用户名"
                name='username'
                rules={[
                    { required: true, message: '请输入用户名' },
                    { pattern: /^[a-zA-Z0-9_-]{3,16}$/, message: '用户名只能包含字母、数字、下划线和连字符，长度为3-16个字符' }
                ]}
                hasFeedback
            >
                <Input placeholder="请输入用户名" />
            </Item>
            <Item
                label="密码"
                name='password'
                rules={[
                    { validator: validatePassword }
                ]}
                hasFeedback
            >
                <Input type="password" placeholder="请输入密码" />
            </Item>
            <Item
                label="确认密码"
                name='confirmPassword'
                dependencies={['password']}
                rules={[
                    { required: true, message: '请确认密码' },
                    {
                        validator: (value: any) => {
                            // 获取密码字段值的简单方式 - 不使用Form.useFormInstance
                            const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
                            const passwordValue = passwordInput ? passwordInput.value : '';

                            if (!value || passwordValue === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('两次输入的密码不一致');
                        }
                    }
                ]}
                hasFeedback
            >
                <Input type="password" placeholder="请再次输入密码" />
            </Item>
            <div className='rainbow-form-submit-area'>
                <Button type="submit" btnType={ButtonType.Primary}>提交</Button>
            </div>
        </Form>
    );
};
