# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## `npm start`

## github

[text](https://github.com/zihao17/rainbow-ui)

[text](https://rainbow-9bwb6s833-zihao17s-projects.vercel.app/)

## TODO

项⽬⼯作：
基于Monorepo实现多包管理，使⽤pnpm workspace统⼀依赖版本，采⽤ESlint+Husky规范代码质
量，实现提交前⾃动检查
封装15+常⽤组件，包括Message函数组件、Tree递归组件、Dialog/Select传送⻔等复杂组件，⽀
持按需引⼊和全局引⼊
设计Preview插件，实现组件源码预览，并集成highlight.js，实现代码⾼亮
使⽤VitePress搭建组件库⽂档站点，提供完整的⽂档和组件实例，并⾃动化部署到vercel
完成npm打包发布，⽀持ES Module、UMD两种格式输出

## My Notes

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

### 3.26今日总结

1. 组件开发进展

   - 完成了 Menu 组件的基础实现，包括样式和类型定义
   - 实现了 Transition 组件，包含基础样式和演示页面.

storybook 组件文档
info addon

### 3.27今日总结

### 3.28

omit

### 遇到的问题

1.form表单的input框，可能type 是文字，可能是checkbox，可能是radio单选框 。
有三个变数：value的名称，更新回调的名称，获取事件对象的值。

### 4.3

- 进行了一半Form组件的开发\*\*
- 定制化storybook主题\*\*
- 完成Divider组件的开发
- 完成Paginator组件的开发
- 完成Image组件的开发
- 完成Loading组件的开发

### 4.6

- 完成Form组件
- 完善App.tsx主页的样式
- 完善storybook文档
- 待办:过渡动画的样式,upload拖拽上传.
