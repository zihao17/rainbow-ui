import React, { FC } from 'react'
import classNames from 'classnames'

// 进度条属性接口
export interface ProgressProps {
    percent: number; // 百分比
    strokeHeight?: number; // 高度
    showText?: boolean; // 是否显示文字
    styles?: React.CSSProperties; // 自定义样式
    theme?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'; // 主题
}

// 进度条组件
export const Progress: FC<ProgressProps> = (props) => {
    const {
        percent,
        strokeHeight = 15,
        showText = true,
        styles,
        theme = 'primary'
    } = props

    // 进度条样式类
    const classes = classNames('rainbow-ui-progress-bar', {
        [`color-${theme}`]: theme
    })

    return (
        <div className="rainbow-ui-progress-bar-wrapper" style={styles}>
            <div
                className={classes}
                style={{
                    height: `${strokeHeight}px`,
                    width: `${percent}%`
                }}
            >
                {showText && <span className="inner-text">{`${percent}%`}</span>}
            </div>
        </div>
    )
}

export default Progress