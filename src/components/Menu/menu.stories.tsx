import type { Meta, StoryObj } from '@storybook/react';
import Menu from './menu';

// 组件文档信息
const meta: Meta<typeof Menu> = {
    title: 'Components/Menu 菜单',
    component: Menu,
    parameters: {
        layout: 'centered', // 全屏布局方式，居中
        docs: {
            description: {
                component: `
导航菜单，为页面和功能提供导航的菜单列表。

## 引入方式

\`\`\`jsx
import Menu from 'rainbow-ui'
\`\`\`

## 基本用法

\`\`\`jsx
<Menu defaultIndex={0} onSelect={(index) => console.log(index)}>
  <Menu.Item>菜单项一</Menu.Item>
  <Menu.Item>菜单项二</Menu.Item>
  <Menu.Item>菜单项三</Menu.Item>
</Menu>
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        defaultIndex: {
            description: '默认激活的菜单项索引',
            control: 'text',
            table: {
                type: { summary: 'string | number' },
                defaultValue: { summary: '0' },
            },
        },
        mode: {
            description: '菜单类型',
            control: 'select',
            options: ['horizontal', 'vertical'],
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' },
            },
        },
        onSelect: {
            description: '被选中时调用',
            action: 'selected',
            table: {
                type: { summary: '(selectedIndex: string | number) => void' },
            },
        },
        className: {
            description: '自定义类名',
            control: 'text',
        },
        style: {
            description: '自定义样式',
            control: 'object',
        },
        children: {
            description: '菜单内容',
            control: 'text',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Menu>;

/**
 * 菜单组件
 * ## 引入Menu
 * ```jsx
 * import Menu from 'rainbow-ui'
 * ```
 * ## 使用Menu
 * ```jsx
 * <Menu defaultIndex={0} onSelect={(index) => console.log(index)}>
 *   <Menu.Item>菜单项一</Menu.Item>
 *   <Menu.Item>菜单项二</Menu.Item>
 *   <Menu.Item>菜单项三</Menu.Item>
 * </Menu>
 * ```
 */

// 水平菜单
export const Horizontal: Story = {
    name: '水平菜单',
    args: {
        defaultIndex: 0,
        mode: Menu.Mode.Horizontal
    },
    render: (args) => (
        <Menu {...args}>
            <Menu.Item>首页</Menu.Item>
            <Menu.Item>产品</Menu.Item>
            <Menu.Item>服务</Menu.Item>
            <Menu.Item>关于我们</Menu.Item>
            <Menu.Item disabled>帮助中心</Menu.Item>
        </Menu>
    ),
    parameters: {
        docs: {
            description: {
                story: '水平模式的菜单，默认样式。',
            },
        },
    },
};

// 垂直菜单
export const Vertical: Story = {
    name: '垂直菜单',
    args: {
        defaultIndex: 0,
        mode: Menu.Mode.Vertical,
    },
    render: (args) => (
        <Menu {...args} style={{ width: '200px' }}>
            <Menu.Item>首页</Menu.Item>
            <Menu.Item>产品</Menu.Item>
            <Menu.Item>服务</Menu.Item>
            <Menu.Item>关于我们</Menu.Item>
            <Menu.Item disabled>帮助中心</Menu.Item>
        </Menu>
    ),
    parameters: {
        docs: {
            description: {
                story: '垂直模式的菜单，通过设置 `mode` 属性为 `vertical` 来实现。',
            },
        },
    },
};

// 子菜单
export const WithSubmenu: Story = {
    name: '子菜单',
    args: {
        mode: Menu.Mode.Horizontal
    },
    render: () => (
        <Menu defaultIndex='0' mode={Menu.Mode.Horizontal}>
            <Menu.Item>首页</Menu.Item>
            <Menu.SubMenu title="产品">
                <Menu.Item>选项1</Menu.Item>
                <Menu.Item>选项2</Menu.Item>
                <Menu.Item>选项3</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="服务">
                <Menu.Item>选项4</Menu.Item>
                <Menu.Item>选项5</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item>关于我们</Menu.Item>
        </Menu>
    ),
    parameters: {
        docs: {
            description: {
                story: '使用 SubMenu 组件可以创建包含子菜单的菜单项。',
            },
        },
    },
};

// 垂直子菜单
export const VerticalSubmenu: Story = {
    name: '垂直子菜单',
    args: {
        mode: Menu.Mode.Vertical
    },
    render: () => (
        <Menu defaultIndex='0' mode={Menu.Mode.Vertical} style={{ width: '200px' }}>
            <Menu.Item>首页</Menu.Item>
            <Menu.SubMenu title="产品">
                <Menu.Item>选项1</Menu.Item>
                <Menu.Item>选项2</Menu.Item>
                <Menu.Item>选项3</Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="服务">
                <Menu.Item>选项4</Menu.Item>
                <Menu.Item>选项5</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item>关于我们</Menu.Item>
        </Menu>
    ),
    parameters: {
        docs: {
            description: {
                story: '垂直模式下的子菜单。',
            },
        },
    },
};