# Rainbow UI - Image 图片组件

Image组件提供了便捷、美观且功能丰富的图片展示体验。

## 特性

- 基础图片展示
- 支持图片懒加载
- 图片预览功能（单图和多图预览）
- 支持自定义图片尺寸和圆角
- 多种图片适应方式（objectFit）
- 加载中状态和加载失败状态的占位显示
- 自定义占位内容

## 基本用法

```jsx
import { Image } from 'rainbow-ui';

// 基础用法
<Image src="图片地址.jpg" alt="图片描述" />

// 设置尺寸和圆角
<Image
  src="图片地址.jpg"
  width={300}
  height={200}
  borderRadius="8px"
/>

// 懒加载
<Image
  src="图片地址.jpg"
  lazy={true}
/>

// 预览功能
<Image
  src="图片地址.jpg"
  preview={true}
/>

// 图片组预览
<Image
  src="图片1.jpg"
  preview={true}
  previewGroup={{
    images: ["图片1.jpg", "图片2.jpg", "图片3.jpg"],
    current: 0
  }}
/>
```

## API

### Image

| 参数         | 说明                 | 类型                                                     | 默认值  |
| ------------ | -------------------- | -------------------------------------------------------- | ------- |
| src          | 图片地址             | string                                                   | -       |
| alt          | 图片描述             | string                                                   | -       |
| width        | 图片宽度             | string \| number                                         | -       |
| height       | 图片高度             | string \| number                                         | -       |
| borderRadius | 图片圆角             | string \| number                                         | -       |
| objectFit    | 图片适应容器的方式   | 'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down' | 'cover' |
| preview      | 是否开启预览         | boolean                                                  | true    |
| lazy         | 是否启用懒加载       | boolean                                                  | false   |
| placeholder  | 加载中显示的占位内容 | ReactNode                                                | -       |
| fallback     | 加载失败显示的内容   | ReactNode                                                | -       |
| previewGroup | 预览组属性           | { images: string[], current?: number }                   | -       |
| className    | 自定义类名           | string                                                   | -       |
| style        | 自定义样式           | CSSProperties                                            | -       |

## 预览功能说明

图片预览模式支持以下操作：

- 缩放：点击工具栏上的放大/缩小按钮，或使用键盘的 +/- 键
- 旋转：点击工具栏上的旋转按钮
- 拖动：在预览界面上按住鼠标拖动图片
- 多图切换：使用工具栏上的左右箭头按钮，或使用键盘的左右方向键
- 关闭预览：点击工具栏上的关闭按钮，或点击预览区域外部，或按ESC键
- 重置图片状态：双击图片
