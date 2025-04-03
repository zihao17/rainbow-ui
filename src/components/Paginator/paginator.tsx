import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

// 枚举分页器尺寸
export enum PaginatorSize {
    Small = 'sm',
    Medium = 'md',
    Large = 'lg',
}

// 枚举分页器主题风格
export enum PaginatorTheme {
    Colorful = 'colorful', // 多彩风格
    Simple = 'simple',     // 简约风格
}

// 定义分页器基础属性接口
export interface BasePaginatorProps {
    /** 当前页码，从1开始 */
    current?: number;
    /** 默认的当前页码 */
    defaultCurrent?: number;
    /** 数据总数 */
    total: number;
    /** 每页条目数 */
    pageSize?: number;
    /** 默认的每页条目数 */
    defaultPageSize?: number;
    /** 页码改变的回调函数 */
    onChange?: (page: number, pageSize: number) => void;
    /** 是否禁用 */
    disabled?: boolean;
    /** 分页器尺寸 */
    size?: PaginatorSize;
    /** 分页器主题风格 */
    theme?: PaginatorTheme;
    /** 是否显示快速跳转 */
    showQuickJumper?: boolean;
    /** 只有一页时是否隐藏分页器 */
    hideOnSinglePage?: boolean;
    /** 页码按钮的数量，当总页数超过此值时会折叠 */
    showPageCount?: number;
    /** 自定义类名 */
    className?: string;
    /** 是否显示总数 */
    showTotal?: (total: number, range: [number, number]) => React.ReactNode;
    /** 是否显示跳转到首页和尾页的按钮 */
    showFirstLastButtons?: boolean;
}

// 导出组件完整属性类型
export type PaginatorProps = BasePaginatorProps & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>;

// 分页器组件
const Paginator: React.FC<PaginatorProps> = (props) => {
    const {
        current,
        defaultCurrent = 1,
        total,
        pageSize,
        defaultPageSize = 10,
        onChange,
        disabled = false,
        size = PaginatorSize.Medium,
        theme = PaginatorTheme.Colorful,
        showQuickJumper = false,
        hideOnSinglePage = false,
        showPageCount = 5,
        className,
        showTotal,
        showFirstLastButtons = false,
        ...restProps
    } = props;

    // 控制当前页码的状态
    const [currentPage, setCurrentPage] = useState<number>(current || defaultCurrent);
    // 控制每页显示数量的状态
    const [pageSizeState, setPageSizeState] = useState<number>(pageSize || defaultPageSize);
    // 用于快速跳转的输入框状态
    const [jumpPage, setJumpPage] = useState<string>('');

    // 计算总页数
    const totalPages = Math.max(1, Math.ceil(total / pageSizeState));

    // 当传入的current改变时，更新内部状态
    useEffect(() => {
        if (current !== undefined) {
            setCurrentPage(current);
        }
    }, [current]);

    // 当传入的pageSize改变时，更新内部状态
    useEffect(() => {
        if (pageSize !== undefined) {
            setPageSizeState(pageSize);
        }
    }, [pageSize]);

    // 如果只有一页且设置了hideOnSinglePage，则不渲染分页器
    if (hideOnSinglePage && totalPages <= 1) {
        return null;
    }

    // 处理页码点击事件
    const handlePageClick = (page: number): void => {
        if (page === currentPage || page < 1 || page > totalPages || disabled) {
            return;
        }

        if (current === undefined) {
            setCurrentPage(page);
        }

        onChange?.(page, pageSizeState);
    };

    // 处理上一页事件
    const handlePrevClick = (): void => {
        handlePageClick(currentPage - 1);
    };

    // 处理下一页事件
    const handleNextClick = (): void => {
        handlePageClick(currentPage + 1);
    };

    // 处理首页事件
    const handleFirstPageClick = (): void => {
        handlePageClick(1);
    };

    // 处理尾页事件
    const handleLastPageClick = (): void => {
        handlePageClick(totalPages);
    };

    // 处理快速跳转事件
    const handleJumpInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        // 只允许输入数字
        if (value === '' || /^\d+$/.test(value)) {
            setJumpPage(value);
        }
    };

    // 处理键盘输入跳转
    const handleJumpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleJump();
        }
    };

    // 处理跳转按钮点击
    const handleJump = (): void => {
        if (jumpPage) {
            const page = parseInt(jumpPage, 10);
            if (!isNaN(page)) {
                // 确保页码在有效范围内
                const validPage = Math.min(Math.max(1, page), totalPages);
                handlePageClick(validPage);
                setJumpPage('');
            }
        }
    };

    // 生成页码列表
    const renderPageNumbers = (): React.ReactNode[] => {
        const paginationItems: React.ReactNode[] = [];

        if (totalPages <= 7) {
            // 页码少于等于7个，全部显示
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(renderPageItem(i));
            }
        } else {
            // 页码大于7个，需要折叠显示
            if (currentPage <= 4) {
                // 当前页靠近前面
                for (let i = 1; i <= 5; i++) {
                    paginationItems.push(renderPageItem(i));
                }
                paginationItems.push(renderEllipsis('right'));
                paginationItems.push(renderPageItem(totalPages));
            } else if (currentPage >= totalPages - 3) {
                // 当前页靠近后面
                paginationItems.push(renderPageItem(1));
                paginationItems.push(renderEllipsis('left'));
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    paginationItems.push(renderPageItem(i));
                }
            } else {
                // 当前页在中间
                paginationItems.push(renderPageItem(1));
                paginationItems.push(renderEllipsis('left'));
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    paginationItems.push(renderPageItem(i));
                }
                paginationItems.push(renderEllipsis('right'));
                paginationItems.push(renderPageItem(totalPages));
            }
        }

        return paginationItems;
    };

    // 渲染省略号
    const renderEllipsis = (position: 'left' | 'right'): React.ReactNode => {
        return (
            <li
                key={`ellipsis-${position}`}
                className="paginator-ellipsis"
                title="更多页码"
            >
                <span>•••</span>
            </li>
        );
    };

    // 渲染页码按钮
    const renderPageItem = (page: number): React.ReactNode => {
        const isActive = page === currentPage;
        const pageItemClasses = classNames('paginator-item', {
            'active': isActive,
            'disabled': disabled,
        });

        return (
            <li
                key={page}
                className={pageItemClasses}
                onClick={() => handlePageClick(page)}
                title={`第${page}页`}
            >
                <span>{page}</span>
            </li>
        );
    };

    // 计算当前页面显示的数据范围
    const getDataRange = (): [number, number] => {
        const start = (currentPage - 1) * pageSizeState + 1;
        const end = Math.min(currentPage * pageSizeState, total);
        return [start, end];
    };

    // 生成分页器类名
    const paginatorClasses = classNames('rainbow-paginator', className, {
        [`paginator-${size}`]: size,
        [`paginator-${theme}`]: theme,
        'paginator-disabled': disabled,
    });

    return (
        <div className={paginatorClasses} {...restProps}>
            <div className="paginator-container">
                {/* 显示总数信息 */}
                {showTotal && (
                    <div className="paginator-total">
                        {showTotal(total, getDataRange())}
                    </div>
                )}

                <ul className="paginator-list">
                    {/* 首页按钮 */}
                    {showFirstLastButtons && (
                        <li
                            className={classNames('paginator-item', 'paginator-first', {
                                'disabled': currentPage === 1 || disabled,
                            })}
                            onClick={handleFirstPageClick}
                            title="首页"
                        >
                            <span>&laquo;</span>
                        </li>
                    )}

                    {/* 上一页按钮 */}
                    <li
                        className={classNames('paginator-item', 'paginator-prev', {
                            'disabled': currentPage === 1 || disabled,
                        })}
                        onClick={handlePrevClick}
                        title="上一页"
                    >
                        <span>&lt;</span>
                    </li>

                    {/* 页码按钮列表 */}
                    {renderPageNumbers()}

                    {/* 下一页按钮 */}
                    <li
                        className={classNames('paginator-item', 'paginator-next', {
                            'disabled': currentPage === totalPages || disabled,
                        })}
                        onClick={handleNextClick}
                        title="下一页"
                    >
                        <span>&gt;</span>
                    </li>

                    {/* 尾页按钮 */}
                    {showFirstLastButtons && (
                        <li
                            className={classNames('paginator-item', 'paginator-last', {
                                'disabled': currentPage === totalPages || disabled,
                            })}
                            onClick={handleLastPageClick}
                            title="尾页"
                        >
                            <span>&raquo;</span>
                        </li>
                    )}
                </ul>

                {/* 快速跳转 */}
                {showQuickJumper && (
                    <div className="paginator-jumper">
                        <span className="paginator-jumper-text">跳至</span>
                        <input
                            type="text"
                            className="paginator-jumper-input"
                            value={jumpPage}
                            onChange={handleJumpInputChange}
                            onKeyDown={handleJumpKeyDown}
                            disabled={disabled}
                            aria-label="页码输入框"
                        />
                        <span className="paginator-jumper-text">页</span>
                        <button
                            className="paginator-jumper-button"
                            onClick={handleJump}
                            disabled={disabled}
                        >
                            确定
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Paginator;
