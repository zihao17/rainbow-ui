import { useState, useEffect } from 'react';

/**
 * 自定义防抖钩子函数
 * @param value 需要防抖的值
 * @param delay 防抖延迟时间（毫秒）
 * @returns 防抖后的值
 */
function useDebounce<T>(value: T, delay = 300): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // 设置定时器
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // 清除副作用
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;