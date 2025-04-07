import { fireEvent, render } from '@testing-library/react'
import Button from './button'

describe('Button 组件测试', () => {
    it('应该正确渲染默认按钮', () => {
        const wrapper = render(<Button>Button</Button>)
        const element = wrapper.getByText('Button')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
    })

    it('应该根据不同的属性正确渲染', () => {
        const wrapper = render(<Button btnType={Button.Type.Primary} size={Button.Size.Large}>Button</Button>)
        const element = wrapper.getByText('Button')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-primary btn-lg')
    })

    it('当btnType为link且提供href时应该渲染为链接', () => {
        const wrapper = render(<Button btnType={Button.Type.Link} href="https://www.baidu.com">Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveAttribute('href', 'https://www.baidu.com')
    })

    it('当disabled为true时应该渲染为禁用状态', () => {
        const wrapper = render(<Button disabled>Disabled Button</Button>)
        const element = wrapper.getByText('Disabled Button')
        expect(element).toBeInTheDocument()
        expect(element).toBeDisabled()
        expect(element).toHaveClass('disabled')
    })

    it('按钮应该能够正确响应点击事件', () => {
        const onClick = jest.fn()
        const wrapper = render(<Button onClick={onClick}>Clickable</Button>)
        const element = wrapper.getByText('Clickable')
        fireEvent.click(element)
        expect(onClick).toHaveBeenCalled()
    })
})
