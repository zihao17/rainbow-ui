// RainbowTheme.ts
import { create } from '@storybook/theming/create';

// 从variables.scss中提取的彩虹UI主题色
export default create({
  // 基础属性
  base: 'light',

  // 品牌相关
  brandTitle: 'Rainbow UI',
  brandUrl: '#',
  brandTarget: '_self',
  brandImage: './rainbow-logo.svg', // 请确保public目录下有此Logo

  // 色彩
  colorPrimary: '#6366f1', // indigo
  colorSecondary: '#7c3aed', // purple

  // UI
  appBg: '#f8fafc', // gray-50
  appContentBg: '#fff', // white
  appBorderColor: '#cbd5e1', // gray-300
  appBorderRadius: 8,

  // 文本颜色
  textColor: '#0f172a', // gray-900
  textInverseColor: '#fff', // white
  textMutedColor: '#64748b', // gray-500

  // 工具栏颜色
  barTextColor: '#475569', // gray-600
  barSelectedColor: '#6366f1', // indigo
  barBg: '#fff', // white

  // 表单颜色
  inputBg: '#fff', // white
  inputBorder: '#cbd5e1', // gray-300
  inputTextColor: '#0f172a', // gray-900
  inputBorderRadius: 6,

  // 按钮相关
  buttonBg: '#6366f1', // indigo
  buttonBorder: 'transparent',

  // 排版
  fontBase: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  fontCode: '"Fira Code", "SFMono-Regular", Menlo, Monaco, Consolas, monospace',
});
