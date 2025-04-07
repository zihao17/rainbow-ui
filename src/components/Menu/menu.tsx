import classnames from 'classnames';
import React, { createContext, useState } from 'react';
import { MenuItemProps } from './menuItem';
import type { SubMenuProps } from './subMenu';

// 将 MenuMode 类型改为枚举
enum MenuMode {
    Horizontal = 'horizontal',
    Vertical = 'vertical'
}

type SelectCallback = (selectedIndex: string | number) => void

export interface MenuProps { //  定义MenuProps接口，用于定义Menu组件的属性
    /** 默认激活的菜单项索引 */
    defaultIndex?: string | number;
    /** 自定义类名 */
    className?: string;
    /** 菜单类型 - 水平或垂直 */
    mode?: MenuMode;
    /** 自定义样式 */
    style?: React.CSSProperties;
    /** 菜单项选中回调 */
    onSelect?: SelectCallback;
    /** 子元素 */
    children?: React.ReactNode;
}

interface IMenuContext {
    index: string | number;
    onSelect?: SelectCallback;
    mode?: MenuMode;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 })

// 默认属性值
const defaultProps: Partial<MenuProps> = {
    defaultIndex: 0,
    mode: MenuMode.Horizontal,
    className: '',
    style: {}
}

const Menu = ((props) => { //  导出一个名为Menu的React函数组件，接受一个MenuProps类型的props参数
    // 合并默认属性和传入的属性
    const finalProps = { ...defaultProps, ...props } as MenuProps
    const {
        mode,
        style,
        children,
        className,
        defaultIndex,
        onSelect
    } = finalProps

    const [currentActive, setCurrentActive] = useState(defaultIndex)

    const passedContext: IMenuContext = {
        index: currentActive !== undefined ? currentActive : (defaultIndex as string | number),
        mode,
        onSelect: (index: string | number) => {
            setCurrentActive(index)
            if (onSelect) {
                onSelect(index)
            }
        }
    }
    // 设置菜单类名
    const classes = classnames('rainbow-menu', className, {
        'menu-vertical': mode === MenuMode.Vertical,
        'menu-horizontal': mode !== MenuMode.Vertical, // 默认为水平
    })

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index
                })
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem component')
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}) as React.FC<MenuProps> & {
    Mode: typeof MenuMode;
    Item: React.FC<MenuItemProps>;
    SubMenu: React.FC<SubMenuProps>;
};

// 将枚举作为静态属性添加到 Menu 组件
Menu.Mode = MenuMode;

export default Menu