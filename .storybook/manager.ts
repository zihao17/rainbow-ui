import { addons } from '@storybook/manager-api';
import rainbowTheme from './RainbowTheme';

// 应用自定义主题
addons.setConfig({
  theme: rainbowTheme,
  // 设置侧边栏默认展开组件文档
  sidebar: {
    showRoots: false,
  },
  // 工具栏配置
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
