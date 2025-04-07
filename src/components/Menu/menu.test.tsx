import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import Menu, { MenuProps } from './menu'

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test',
}

const testVeritcalProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    mode: Menu.Mode.Vertical,
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <Menu.Item>active</Menu.Item>
            <Menu.Item disabled>disabled</Menu.Item>
            <Menu.Item>333</Menu.Item>
            <Menu.SubMenu title="下拉菜单">
                <Menu.Item>下拉选项1</Menu.Item>
                <Menu.Item>下拉选项2</Menu.Item>
            </Menu.SubMenu>
        </Menu>
    )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('测试Menu组件', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testProps))
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })

    it('应该根据默认属性正确渲染Menu和MenuItem', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('rainbow-menu test')
        // 现在有4个一级菜单项（3个Menu.Item + 1个Menu.SubMenu）
        expect(menuElement.querySelectorAll(':scope > .menu-item').length).toEqual(4)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    })

    it('点击菜单项应该改变激活状态并调用正确的回调函数', () => {
        const thirdItem = wrapper.getByText('333')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith(2)
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
    })

    it('当mode设置为vertical时应该渲染垂直模式', () => {
        cleanup()
        wrapper = render(generateMenu(testVeritcalProps))
        menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })

    it('鼠标悬停在SubMenu上应该显示下拉菜单', () => {
        const submenuElement = wrapper.getByText('下拉菜单')
        fireEvent.mouseEnter(submenuElement.parentElement as HTMLElement)
        // 等待下拉菜单显示
        setTimeout(() => {
            const submenu = wrapper.getByTestId('submenu-test')
            expect(submenu).toHaveClass('menu-opened')
            expect(submenu).not.toHaveClass('menu-closed')
        }, 300)

        fireEvent.mouseLeave(submenuElement.parentElement as HTMLElement)
        // 等待下拉菜单隐藏
        setTimeout(() => {
            const submenu = wrapper.getByTestId('submenu-test')
            expect(submenu).toHaveClass('menu-closed')
            expect(submenu).not.toHaveClass('menu-opened')
        }, 500)
    })

    it('点击SubMenu在垂直模式下应该切换下拉菜单', () => {
        cleanup()
        wrapper = render(generateMenu(testVeritcalProps))
        const submenuElement = wrapper.getByText('下拉菜单')

        // 初始状态下拉菜单应该是关闭的
        const submenu = wrapper.getByTestId('submenu-test')
        expect(submenu).toHaveStyle('display: none')

        // 点击后应该打开
        fireEvent.click(submenuElement)
        expect(submenu).not.toHaveStyle('display: none')

        // 再次点击应该关闭
        fireEvent.click(submenuElement)
        setTimeout(() => {
            expect(submenu).toHaveStyle('display: none')
        }, 300)
    })
})
