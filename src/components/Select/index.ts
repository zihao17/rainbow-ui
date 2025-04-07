import { Select, SelectMode, SelectOptionProps, SelectProps, SelectSize } from './select';

// 导出单一对象，包含组件和相关枚举
const SelectPackage = Object.assign(Select, {
  Mode: SelectMode,
});

// 导出单一默认对象
export default SelectPackage;
// 类型导出保留给 TypeScript 类型系统使用
export type { SelectOptionProps, SelectProps, SelectSize };
