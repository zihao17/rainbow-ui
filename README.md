# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## `npm start`

# My Notes

components
style: variables / reboot / index
Button: mixin / style / button.tsx
Alert: style / alert.tsx / demo
jest test react-testing-library jest-dom npm run test xxx.test.tsx
Menu: useState / useContext

解决Menu.defaultProps报错
Partial 替代 defaultProps , 合并默认属性和传入的属性

### 3.25今日总结

1. 组件开发进展

   - 完成了 Button 组件的基础实现，包括样式和类型定义
   - 实现了 Alert 组件，包含基础样式和演示页面
   - 开始开发 Menu 组件，使用 React Hooks (useState, useContext) 进行状态管理

2. 测试相关

   - 配置了 Jest 和 React Testing Library 测试环境
   - 使用 jest-dom 进行 DOM 测试
   - 编写了组件测试用例（.test.tsx 文件）

3. 技术改进

   - 解决了 Menu.defaultProps 的类型报错问题
   - 使用 TypeScript 的 Partial 类型来替代 defaultProps，实现了更好的属性合并机制

4. 样式系统

   - 建立了基础的样式变量系统
   - 实现了样式重置（reboot）
   - 创建了统一的样式索引文件

5. 项目结构优化
   - 组件目录结构规范化
   - 分离了样式和逻辑代码
   - 添加了组件演示页面
