import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/styles/index.scss';
import './preview-styles.scss'; // 导入自定义预览样式

// 自定义视口设置
const customViewports = {
    mobile: {
        name: '手机视图',
        styles: {
            width: '375px',
            height: '667px',
        },
    },
    tablet: {
        name: '平板视图',
        styles: {
            width: '768px',
            height: '1024px',
        },
    },
    desktop: {
        name: '桌面视图',
        styles: {
            width: '1200px',
            height: '800px',
        },
    },
};

// 自定义背景选项
const backgrounds = {
    default: '默认白色',
    values: [
        { name: '默认白色', value: '#ffffff' },
        { name: '浅灰色', value: '#f8fafc' }, // gray-50
        { name: '彩虹渐变', value: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(124, 58, 237, 0.05) 100%)' },
        { name: '深色模式', value: '#0f172a' }, // gray-900
    ],
};

const preview: Preview = {
    parameters: {
        // 控件配置
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
            expanded: true, // 默认展开所有控件
            sort: 'requiredFirst', // 必需参数优先显示
        },
        // 操作配置
        // actions: {
        //     argTypesRegex: '^on[A-Z].*'
        // },
        // 自定义背景选项
        backgrounds: backgrounds,
        // 自定义视口设置
        viewport: {
            viewports: customViewports,
            defaultViewport: 'desktop'
        },
        // 布局设置
        layout: 'centered',
        // 文档配置
        docs: {
            // 默认生成所有文档页面
            autodocs: true,
            // 文档页面标题格式化
            toc: true,
        },
        // 定制组件源码展示
        options: {
            storySort: {
                order: ['介绍', '设计系统', '基础组件', '*'],
            },
        },
    },
    // 装饰器
    decorators: [
        (Story) => (
            <div className="rainbow-theme-container">
                <Story />
            </div>
        ),
    ],
};

export default preview;