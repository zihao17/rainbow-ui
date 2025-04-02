import React, { useState, useRef, useEffect, KeyboardEvent, MouseEvent } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Transition from '../Transition';
import useClickOutside from '../../hooks/useClickOutside';

// 选择器模式枚举
export enum SelectMode {
    Single = 'single',
    Multiple = 'multiple'
}

// 选择器尺寸枚举
export type SelectSize = 'large' | 'middle' | 'small';

// 选项属性接口
export interface SelectOptionProps {
    value: string;
    label: string;
    disabled?: boolean;
}

// 基础Select属性接口
export interface BaseSelectProps {
    /**
     * 指定默认选中的条目，单选时为string，多选时为string[]
     */
    defaultValue?: string | string[];
    /**
     * 选择器模式 - 单选或多选
     */
    mode?: SelectMode;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 占位文本
     */
    placeholder?: string;
    /**
     * 下拉选项
     */
    options?: SelectOptionProps[];
    /**
     * 自定义类名
     */
    className?: string;
    /**
     * 自定义样式
     */
    style?: React.CSSProperties;
    /**
     * 选择框宽度
     */
    width?: number;
    /**
     * 选择器大小
     */
    size?: SelectSize;
    /**
     * 下拉菜单显示隐藏的回调
     */
    onVisibleChange?: (visible: boolean) => void;
    /**
     * 选择时的回调
     */
    onChange?: (value: string | string[], selectedOptions: SelectOptionProps | SelectOptionProps[]) => void;
}

// Select属性接口
export type SelectProps = BaseSelectProps & Omit<React.InputHTMLAttributes<HTMLElement>, 'onChange' | 'defaultValue' | 'size'>;

/**
 * Select 下拉选择器
 *
 * ### 引入方式
 * ```js
 * import { Select } from 'rainbow-ui'
 * ```
 */
export const Select: React.FC<SelectProps> = (props) => {
    const {
        defaultValue,
        mode = SelectMode.Single,
        disabled = false,
        placeholder,
        options = [],
        className,
        style,
        width,
        size,
        onVisibleChange,
        onChange,
        ...restProps
    } = props;

    // 内部状态
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | string[]>(defaultValue || (mode === SelectMode.Multiple ? [] : ''));
    const selectRef = useRef<HTMLDivElement>(null);

    // 使用自定义钩子检测点击外部
    useClickOutside(selectRef, () => {
        if (isOpen) {
            setIsOpen(false);
            if (onVisibleChange) {
                onVisibleChange(false);
            }
        }
    });

    // 生成样式类
    const selectClasses = classNames('rainbow-select', className, {
        'is-disabled': disabled,
        [`select-${size}`]: size,
        'select-multiple': mode === SelectMode.Multiple,
        'menu-is-open': isOpen,
    });

    // 计算选择器样式
    const selectStyle: React.CSSProperties = {
        ...style,
        width: width ? `${width}px` : '100%',
    };

    // 处理点击选择器
    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (!disabled) {
            setIsOpen(!isOpen);
            if (onVisibleChange) {
                onVisibleChange(!isOpen);
            }
        }
    };

    // 处理选项选择
    const handleOptionClick = (option: SelectOptionProps, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!option.disabled) {
            let newValue: string | string[];
            let selectedOptions: SelectOptionProps | SelectOptionProps[];

            if (mode === SelectMode.Multiple) {
                // 多选模式
                newValue = [...(selectedValue as string[])];
                const index = newValue.indexOf(option.value);

                if (index > -1) {
                    // 已选，则取消选择
                    newValue.splice(index, 1);
                } else {
                    // 未选，则添加选择
                    newValue.push(option.value);
                }

                // 获取完整的选项对象
                selectedOptions = options.filter(item => newValue.includes(item.value));
            } else {
                // 单选模式
                newValue = option.value;
                selectedOptions = option;
                setIsOpen(false);
                if (onVisibleChange) {
                    onVisibleChange(false);
                }
            }

            setSelectedValue(newValue);
            if (onChange) {
                onChange(newValue, selectedOptions);
            }
        }
    };

    // 处理标签删除
    const handleTagRemove = (value: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const newValue = [...(selectedValue as string[])].filter(v => v !== value);
        const selectedOptions = options.filter(item => newValue.includes(item.value));

        setSelectedValue(newValue);
        if (onChange) {
            onChange(newValue, selectedOptions);
        }
    };

    // 获取显示的文本
    const getDisplayValue = () => {
        if (mode === SelectMode.Multiple) {
            if ((selectedValue as string[]).length === 0) {
                return placeholder || '请选择';
            }
            return null; // 多选模式下，显示标签而不是文本
        } else {
            // 单选模式
            if (!selectedValue) {
                return placeholder || '请选择';
            }
            const selectedOption = options.find(option => option.value === selectedValue);
            return selectedOption ? selectedOption.label : '';
        }
    };

    // 渲染选中的多选标签
    const renderTags = () => {
        if (mode === SelectMode.Multiple && (selectedValue as string[]).length > 0) {
            return (
                <div className="rainbow-select-tags">
                    {(selectedValue as string[]).map(value => {
                        const option = options.find(opt => opt.value === value);
                        if (!option) return null;
                        return (
                            <span className="rainbow-select-tag" key={value}>
                                {option.label}
                                <span
                                    className="rainbow-select-tag-remove"
                                    onClick={(e) => handleTagRemove(value, e)}
                                >
                                    <Icon icon="times" />
                                </span>
                            </span>
                        );
                    })}
                </div>
            );
        }
        return null;
    };

    // 渲染下拉选项
    const renderOptions = () => {
        return (
            <Transition
                in={isOpen}
                animation="zoom-in-top"
                timeout={300}
            >
                <ul className="rainbow-select-dropdown">
                    {options.map((option, index) => {
                        // 判断选项是否被选中
                        const isSelected = mode === SelectMode.Multiple
                            ? (selectedValue as string[]).includes(option.value)
                            : selectedValue === option.value;

                        // 生成选项类名
                        const optionClasses = classNames('rainbow-select-item', {
                            'is-disabled': option.disabled,
                            'is-selected': isSelected,
                        });

                        return (
                            <li
                                key={`${option.value}-${index}`}
                                className={optionClasses}
                                onClick={(e) => handleOptionClick(option, e)}
                            >
                                {option.label}
                                {mode === SelectMode.Multiple && isSelected && (
                                    <span className="rainbow-select-item-check">
                                        <Icon icon="check" />
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </Transition>
        );
    };

    return (
        <div
            className={selectClasses}
            style={selectStyle}
            ref={selectRef}
            onClick={handleClick}
            {...restProps}
        >
            <div className="rainbow-select-selector">
                {renderTags()}
                <div className="rainbow-select-value">
                    {getDisplayValue()}
                </div>
            </div>
            <div className="rainbow-select-arrow">
                <Icon icon={isOpen ? "angle-up" : "angle-down"} />
            </div>
            {renderOptions()}
        </div>
    );
};

export default Select;