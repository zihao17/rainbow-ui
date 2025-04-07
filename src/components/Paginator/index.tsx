import Paginator, { PaginatorProps, PaginatorSize, PaginatorTheme } from './paginator';

// 导出单一对象，包含组件和相关类型
const PaginatorPackage = Object.assign(Paginator, {
    Size: PaginatorSize,
    Theme: PaginatorTheme,
});

// 导出单一默认对象
export default PaginatorPackage;
// 类型导出保留给 TypeScript 类型系统使用
export type { PaginatorProps };
