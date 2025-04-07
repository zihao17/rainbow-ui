import { Meta } from '@storybook/react'
import React, { useRef } from 'react'
import Button from '../Button'
import Input from '../Input'
import Select from '../Select'
import Form, { IFormRef } from './form'
import Item from './formItem'
import { CustomRule } from './useStore'

const meta: Meta<typeof Form> = {
  title: 'Components/Form 表单',
  id: 'Form',
  component: Form,
  subcomponents: { 'Item': Item },
  decorators: [
    (Story: React.FC) => (
      <div style={{ width: '550px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        type: "code",
      },
      description: {
        component: `
表单组件，支持异步校验、自定义校验规则、动态表单项等功能。

## 引入方式

\`\`\`jsx
import { Form, Item } from 'rainbow-ui'
\`\`\`

## 基本用法

\`\`\`jsx
<Form onFinish={(values) => console.log(values)}>
  <Item label='用户名' name='name' rules={[{ type: 'string', required: true, min: 3 }]}>
    <Input />
  </Item>
  <Item label='密码' name='password' rules={[{ type: 'string', required: true, min: 6 }]}>
    <Input type="password" />
  </Item>
  <div className='form-submit-area'>
    <Button type="submit" btnType={Button.Type.Primary}>登录</Button>
  </div>
</Form>
\`\`\`
      `,
      },
    }
  }
}
export default meta
const confirmRules: CustomRule[] = [
  { type: 'string', required: true, min: 3, max: 8 },
  ({ getFieldValue }) => ({
    asyncValidator(rule, value) {
      console.log('the value', getFieldValue('password'))
      console.log(value)
      return new Promise((resolve, reject) => {
        if (value !== getFieldValue('password')) {
          reject('The two passwords that you entered do not match!')
        }
        setTimeout(() => {
          resolve()
        }, 1000)
      })

    }
  })
]
export const ABasicForm = (args: any) => {
  return (
    <Form {...args} >
      <Item label='用户名' name='name' rules={[{ type: 'string', required: true, min: 3 }]}>
        <Input />
      </Item>
      <Item label='密码' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
        <Input type="password" />
      </Item>
      <div className='viking-form-submit-area'>
        <Button type="submit" btnType={Button.Type.Primary}>登陆</Button>
      </div>
    </Form>
  )
}
ABasicForm.storyName = '基本的登陆表单'

export const BRegForm = (args: any) => {
  const initialValues = {
    agreement: false
  }
  return (
    <Form {...args} initialValues={initialValues}>
      <Item label='邮件' name='email' rules={[{ type: 'email', required: true }]}>
        <Input />
      </Item>
      <Item label='密码' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
        <Input type="password" />
      </Item>
      <Item
        label='性别'
        name='gender'
        rules={[{ type: 'string', required: true }]}
        getValueFromEvent={(e) => e}
        valuePropName='defaultValue'
      >
        <Select
          placeholder="请选择性别"
          options={[
            { value: '男', label: '男' },
            { value: '女', label: '女' }
          ]}
        />
      </Item>
      <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
        <Item
          name='agreement'
          rules={[{ type: 'enum', enum: [true], message: '请同意协议' }]}
          getValueFromEvent={(e) => e.target.checked}
          valuePropName='checked'
        >
          <input type="checkbox" />
        </Item>
        <span className="agree-text">注册即代表你同意<a href='#'>用户协议</a></span>
      </div>
      <div className='viking-form-submit-area'>
        <Button type="submit" btnType={Button.Type.Primary}>登陆</Button>
      </div>
    </Form>
  )
}
BRegForm.storyName = '注册表单，支持多种 FormItem 组件'
export const CFullForm = (args: any) => {
  const ref = useRef<IFormRef>(null)
  const resetAll = () => {
    console.log('form ref', ref.current)
    console.log('get value', ref.current?.getFieldValue('username'))
    ref.current?.resetFields()

  }
  return (
    <Form initialValues={{ username: 'viking', agreement: false }} {...args} ref={ref}>
      {({ isValid, isSubmitting }) => (
        <>
          <Item label='用户名' name='username' rules={[{ type: 'email', required: true }]}>
            <Input />
          </Item>
          <Item label='密码' name='password' rules={[{ type: 'string', required: true, min: 3, max: 8 }]}>
            <Input type='password' />
          </Item>
          <Item label='重复密码' name='confirmPwd' rules={confirmRules}>
            <Input type='password' />
          </Item>
          <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center' }}>
            <Item
              name='agreement'
              valuePropName='checked'
              getValueFromEvent={(e) => e.target.checked}
              rules={[{ type: 'enum', enum: [true], message: '请同意协议' }]}
            >
              <input type="checkbox" />
            </Item>
            <span className="agree-text">注册即代表你同意<a href='#'>用户协议</a></span>
          </div>
          <div className='viking-form-submit-area'>
            <Button type="submit" btnType={Button.Type.Primary}>登陆 {isSubmitting ? '验证中' : '验证完毕'} {isValid ? '通过😄' : '没通过😢'} </Button>
            <Button type="button" onClick={resetAll}>重置</Button>
          </div>
        </>
      )}
    </Form>
  )
}

CFullForm.storyName = '自定义规则，调用表单实例'