import classNames from 'classnames'
import React, { ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef, useState } from 'react'
import { useClickOutside, useDebounce } from '../../hooks'
import Icon from '../Icon'
import Input from '../Input'
import Transition from '../Transition'
import './autoComplete.scss'

// 获取 Input 组件的 Props 类型
type InputProps = React.ComponentProps<typeof Input>;

// 定义数据源类型接口
interface DataSourceObjectType {
    value: string;
    [key: string]: any;
}

// 创建一个 DataSourceObject 常量，可以作为值使用
const DataSourceObject = {
    create: <T extends object>(value: string, other?: T): DataSourceObjectType & T => {
        return { value, ...other } as DataSourceObjectType & T;
    }
};

// 组件属性接口
interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
    /**
     * 获取输入建议的函数，可以是同步或异步的
     */
    fetchSuggestions: (str: string) => DataSourceObjectType[] | Promise<DataSourceObjectType[]>;
    /**
     * 选择建议项时触发的回调
     */
    onSelect?: (item: DataSourceObjectType) => void;
    /**
     * 输入框内容变化时触发的回调
     */
    onChange?: (value: string) => void;
    /**
     * 自定义渲染下拉选项的函数
     */
    renderOption?: (item: DataSourceObjectType) => ReactElement;
    /**
     * 防抖延迟时间（毫秒）
     */
    debounceDelay?: number;
}

/**
 * 自动完成组件
 * 输入框自动完成功能，支持同步和异步数据源，键盘导航，自定义渲染等功能
 */
const AutoComplete = ((props: AutoCompleteProps) => {
    const {
        fetchSuggestions,
        onSelect,
        onChange,
        value,
        renderOption,
        debounceDelay = 300,
        ...restProps
    } = props

    // 状态管理
    const [inputValue, setInputValue] = useState(value as string)
    const [suggestions, setSuggestions] = useState<DataSourceObjectType[]>([])
    const [loading, setLoading] = useState(false)
    const [highlightIndex, setHighlightIndex] = useState(-1)
    const [showDropdown, setShowDropdown] = useState(false)

    // 引用
    const triggerSearch = useRef(true)
    const componentRef = useRef<HTMLDivElement>(null)

    // 使用防抖处理输入
    const debouncedValue = useDebounce(inputValue, debounceDelay)

    // 点击外部区域关闭下拉列表
    useClickOutside(componentRef, () => {
        setSuggestions([])
        setShowDropdown(false)
    })

    // 监听防抖后的输入值变化，触发搜索
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions(debouncedValue)

            // 处理同步或异步结果
            if (results instanceof Promise) {
                setLoading(true)
                results.then(data => {
                    setLoading(false)
                    setSuggestions(data)
                    if (data.length > 0) {
                        setShowDropdown(true)
                    }
                }).catch(e => {
                    setLoading(false)
                    console.error('获取建议出错：', e)
                })
            } else {
                setSuggestions(results)
                if (results.length > 0) {
                    setShowDropdown(true)
                }
            }
        } else {
            setSuggestions([])
            setShowDropdown(false)
        }
        // 重置高亮索引
        setHighlightIndex(-1)
    }, [debouncedValue, fetchSuggestions])

    // 处理输入变化
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true

        // 调用外部 onChange
        if (onChange) {
            onChange(value)
        }
    }

    // 处理选择建议项
    const handleSelect = (item: DataSourceObjectType) => {
        setInputValue(item.value)
        setSuggestions([])
        setShowDropdown(false)
        triggerSearch.current = false

        // 调用外部 onSelect
        if (onSelect) {
            onSelect(item)
        }
    }

    // 处理键盘事件（上下导航和回车选择）
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const suggestionCount = suggestions.length

        switch (e.key) {
            case 'ArrowUp':
                if (suggestionCount > 0) {
                    e.preventDefault() // 防止光标移动到行首
                    setHighlightIndex(prevIndex =>
                        prevIndex <= 0 ? suggestionCount - 1 : prevIndex - 1
                    )
                }
                break
            case 'ArrowDown':
                if (suggestionCount > 0) {
                    e.preventDefault() // 防止光标移动到行尾
                    setHighlightIndex(prevIndex =>
                        prevIndex >= suggestionCount - 1 ? 0 : prevIndex + 1
                    )
                }
                break
            case 'Enter':
                if (highlightIndex >= 0 && highlightIndex < suggestionCount) {
                    handleSelect(suggestions[highlightIndex])
                    e.preventDefault() // 防止表单提交
                }
                break
            case 'Escape':
                setSuggestions([])
                setShowDropdown(false)
                e.preventDefault()
                break
            default:
                break
        }
    }

    // 渲染下拉选项
    const renderTemplate = (item: DataSourceObjectType) => {
        return renderOption ? renderOption(item) : item.value
    }

    // 生成下拉菜单
    const generateDropdown = () => {
        return (
            <Transition
                in={showDropdown}
                animation="zoom-in-top"
                timeout={300}
                unmountOnExit
            >
                <ul className="rainbow-suggestion-list">
                    {loading &&
                        <div className="suggestions-loading-icon">
                            <Icon icon="spinner" spin />
                        </div>
                    }
                    {suggestions.map((item, index) => {
                        const classes = classNames('suggestion-item', {
                            'is-active': index === highlightIndex
                        })
                        return (
                            <li
                                key={index}
                                className={classes}
                                onClick={() => handleSelect(item)}
                            >
                                {renderTemplate(item)}
                            </li>
                        )
                    })}
                </ul>
            </Transition>
        )
    }

    return (
        <div className="rainbow-auto-complete" ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            {generateDropdown()}
        </div>
    )
}) as React.FC<AutoCompleteProps> & {
    DataSourceType: typeof DataSourceObject;
};

// 将 DataSourceObject 添加为静态属性
AutoComplete.DataSourceType = DataSourceObject;

export default AutoComplete;

