import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

// 将子组件作为 Menu 的静态属性
Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;

// 只导出 Menu 组件
export default Menu;
