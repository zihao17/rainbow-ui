import React, { useContext } from 'react'
import classnames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
    index?: string | number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { index, disabled, className, style, children } = props
    const context = useContext(MenuContext)
    // 确定是否是子菜单项
    const isSubMenuItem = typeof index === 'string' && index.includes('-')

    const classes = classnames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index,
        'submenu-item-active': isSubMenuItem && context.index === index
    })

    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index !== 'undefined')) {
            context.onSelect(index)
        }
    }
    return (
        <li onClick={handleClick} className={classes} style={style} data-testid="test-menu-item">
            {children}
        </li>
    )
}

MenuItem.displayName = 'MenuItem'
export default MenuItem