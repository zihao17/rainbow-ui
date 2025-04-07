import classnames from 'classnames'
import React, { useContext, useRef, useState } from 'react'
import Icon from '../Icon'
import Menu, { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

export interface SubMenuProps {
  index?: string | number;
  title: string
  className?: string
  children?: React.ReactNode
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const context = useContext(MenuContext)

  // 检查是否有子菜单项被激活
  const isChildActive = () => {
    const currentIndex = context.index;
    if (typeof currentIndex === 'string' && typeof index !== 'undefined') {
      // 检查当前激活的索引是否以父菜单的索引为前缀
      return currentIndex.startsWith(`${index}-`);
    }
    return false;
  }

  const classes = classnames('menu-item submenu-item', className, {
    'is-active': context.index === index || isChildActive(),
    'is-opened': menuOpen,
    'is-vertical': context.mode === Menu.Mode.Vertical
  })

  // 添加定时器引用
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 获取菜单模式，默认为水平模式
  const isVertical = context.mode === Menu.Mode.Vertical

  // 添加鼠标事件处理函数
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isVertical) {
      setMenuOpen(!menuOpen)
    }
  }

  // 添加鼠标悬停事件处理
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault()
    if (!isVertical) {
      // 清除现有的定时器
      if (timer.current) {
        clearTimeout(timer.current)
      }

      if (toggle) {
        // 鼠标移入，立即显示菜单
        setMenuOpen(true)
      } else {
        // 鼠标移出，延迟0.5秒关闭菜单
        timer.current = setTimeout(() => {
          setMenuOpen(false)
        }, 500)
      }
    }
  }

  const clickEvents = isVertical ? {
    onClick: handleClick
  } : {}

  const hoverEvents = !isVertical ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}

  const renderChildren = () => {
    const subMenuClasses = classnames('submenu-items', {
      'menu-opened': menuOpen,
      'menu-closed': !menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      // 为子菜单项添加复合索引，确保能够被正确识别
      if (childElement.type.displayName === 'MenuItem') {
        // 计算子菜单项的索引：父索引-子索引
        const childIndex = `${index}-${i}`
        return React.cloneElement(childElement, {
          index: childIndex,
          className: 'submenu-child-item' // 添加特殊类名区分子菜单项
        })
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component')
      }
    })
    return (
      <ul className={subMenuClasses}
        data-testid="submenu-test"
        style={{ display: isVertical && !menuOpen ? 'none' : 'block' }} // 确保垂直模式下初始隐藏
        onMouseEnter={() => { if (!isVertical && timer.current) clearTimeout(timer.current) }}
        onMouseLeave={(e) => { if (!isVertical) handleMouse(e, false) }}
      >
        {childrenComponent}
      </ul>
    )
  }


  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" theme={Icon.Theme.Primary} className='arrow-icon' />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu
