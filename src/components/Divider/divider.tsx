import classNames from 'classnames';
import React, { ReactNode } from 'react';

// 定义分割线方向枚举
enum DividerDirection {
    Horizontal = 'horizontal', // 水平方向
    Vertical = 'vertical'      // 垂直方向
}

// 定义分割线样式枚举
enum DividerStyle {
    Rainbow = 'rainbow',   // 彩虹渐变风格
    Simple = 'simple',     // 简约风格
    Normal = 'normal'      // 正常风格
}

// 文本位置枚举
enum TextAlign {
    Left = 'left',
    Center = 'center',
    Right = 'right'
}

// 分割线组件Props接口
interface DividerProps {
    /** 分割线方向，水平或垂直 */
    direction?: DividerDirection;
    /** 分割线样式，彩虹或简约 */
    dividerStyle?: DividerStyle;
    /** 分割线颜色（当style为simple时生效） */
    color?: string;
    /** 分割线宽度/高度 */
    size?: string;
    /** 分割线长度 */
    length?: string;
    /** 分割线上的文本或图标 */
    children?: ReactNode;
    /** 文本或图标的对齐方式（仅水平方向有效） */
    textAlign?: TextAlign;
    /** 是否虚线 */
    dashed?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
}

/**
 * Rainbow UI 的分割线组件，用于分隔内容区域
 *
 * ### 使用示例:
 * ```
 * // 基础水平分割线
 * <Divider />
 *
 * // 带文本的分割线
 * <Divider>文本内容</Divider>
 *
 * // 垂直分割线
 * <Divider direction="vertical" />
 *
 * // 彩虹风格
 * <Divider dividerStyle="rainbow" />
 * ```
 */
const Divider = ((props: DividerProps) => {
    const {
        direction = DividerDirection.Horizontal,
        dividerStyle = DividerStyle.Rainbow,
        color,
        size,
        length,
        children,
        textAlign = TextAlign.Center,
        dashed = false,
        className,
        style,
        ...restProps
    } = props;

    // 计算组件的类名
    const classes = classNames('rainbow-divider', className, {
        [`rainbow-divider-${direction}`]: direction,
        [`rainbow-divider-${dividerStyle}`]: dividerStyle,
        'rainbow-divider-with-text': children,
        [`rainbow-divider-with-text-${textAlign}`]: children && direction === DividerDirection.Horizontal,
        'rainbow-divider-dashed': dashed
    });

    // 自定义样式
    const customStyle: React.CSSProperties = {
        ...(color && dividerStyle === DividerStyle.Simple ? { backgroundColor: color, borderColor: color } : {}),
        ...(size ? { [direction === DividerDirection.Horizontal ? 'height' : 'width']: size } : {}),
        ...(length ? { [direction === DividerDirection.Horizontal ? 'width' : 'height']: length } : {}),
        ...(style || {})
    };

    return (
        <div className={classes} style={customStyle} {...restProps}>
            {children && direction === DividerDirection.Horizontal && (
                <span className="rainbow-divider-inner-text">{children}</span>
            )}
        </div>
    );
}) as React.FC<DividerProps> & {
    Direction: typeof DividerDirection;
    Style: typeof DividerStyle;
    TextAlign: typeof TextAlign;
};

// 将枚举作为静态属性添加到 Divider 组件
Divider.Direction = DividerDirection;
Divider.Style = DividerStyle;
Divider.TextAlign = TextAlign;

export type { DividerProps };
export default Divider;
