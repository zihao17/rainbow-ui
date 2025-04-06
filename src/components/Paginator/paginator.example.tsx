import React, { useState } from 'react';
import Paginator, { PaginatorSize, PaginatorTheme } from './index';

export const PaginatorExample: React.FC = () => {
    // 基础分页器示例
    const [currentPage, setCurrentPage] = useState<number>(1);
    const total = 200;
    const pageSize = 10;

    const handlePageChange = (page: number, pageSize: number) => {
        console.log(`跳转到第${page}页，每页显示${pageSize}条`);
        setCurrentPage(page);
    };

    return (
        <div className="paginator-examples">



            <div className="example-item">
                <h5>中号分页器（默认）</h5>
                <Paginator
                    total={100}
                    size={PaginatorSize.Medium}
                />
            </div>

            <section>
                <div className="example-item">
                    <h5>多彩风格（默认）</h5>
                    <Paginator
                        total={100}
                        theme={PaginatorTheme.Colorful}
                        showFirstLastButtons
                    />
                </div>
                <div className="example-item">
                    <h5>简约风格</h5>
                    <Paginator
                        total={100}
                        theme={PaginatorTheme.Simple}
                        showFirstLastButtons
                    />
                </div>
            </section>

            <section>
                <h5>带快速跳转的分页器</h5>
                <div className="example-item">
                    <Paginator
                        total={500}
                        showQuickJumper
                        showFirstLastButtons
                    />
                </div>
            </section>

            <section>
                <h5>完整功能示例</h5>
                <div className="example-item">
                    <Paginator
                        total={1000}
                        showQuickJumper
                        showFirstLastButtons
                        showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`}
                        theme={PaginatorTheme.Colorful}
                        size={PaginatorSize.Medium}
                    />
                </div>
            </section>


            <section>
                <h5>禁用状态</h5>
                <div className="example-item">
                    <Paginator
                        total={100}
                        disabled
                    />
                </div>
            </section>
        </div>
    );
};

export default PaginatorExample;