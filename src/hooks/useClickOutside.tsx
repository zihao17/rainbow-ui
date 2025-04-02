import { RefObject, useEffect } from 'react';

/**
 * 自定义钩子，用于检测点击元素外部区域
 * @param ref 需要监听的元素引用
 * @param handler 点击外部区域时触发的回调函数
 */
function useClickOutside(ref: RefObject<HTMLElement | null>, handler: (event: MouseEvent) => void) {
    useEffect(() => {
        const listener = (event: MouseEvent) => {
            // 如果元素不存在或者点击的是元素内部，不执行回调
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        // 添加鼠标点击事件监听
        document.addEventListener('click', listener);

        // 清除副作用
        return () => {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}

export default useClickOutside;