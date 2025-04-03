import React from 'react';
import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Loading 组件', () => {
    // 测试是否正确渲染
    it('应该正确渲染加载组件', () => {
        render(<Loading />);
        const loadingElement = screen.getByTestId('loading');
        expect(loadingElement).toBeInTheDocument();
        expect(loadingElement).toHaveClass('rainbow-loading-container');
    });

    // 测试文本显示
    it('应该显示加载文本', () => {
        const loadingText = '加载中...';
        render(<Loading text={loadingText} />);
        expect(screen.getByText(loadingText)).toBeInTheDocument();
    });

    // 测试全屏模式
    it('应该支持全屏模式', () => {
        render(<Loading fullscreen={true} />);
        const loadingElement = screen.getByTestId('loading');
        expect(loadingElement).toHaveClass('fullscreen');
    });

    // 测试遮罩层
    it('应该支持遮罩层', () => {
        render(<Loading withMask={true} />);
        const loadingElement = screen.getByTestId('loading');
        expect(loadingElement).toHaveClass('with-mask');
    });

    // 测试不显示加载时
    it('不显示加载时应该只渲染子元素', () => {
        const childText = '子元素内容';
        render(
            <Loading isLoading={false}>
                <div>{childText}</div>
            </Loading>
        );
        expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
        expect(screen.getByText(childText)).toBeInTheDocument();
    });

    // 测试包裹内容
    it('应该正确包裹子元素', () => {
        const childText = '子元素内容';
        render(
            <Loading isLoading={true}>
                <div>{childText}</div>
            </Loading>
        );
        expect(screen.getByTestId('loading')).toBeInTheDocument();
        expect(screen.getByText(childText)).toBeInTheDocument();
    });

    // 测试自定义球体数量
    it('应该支持自定义球体数量', () => {
        const ballCount = 5;
        render(<Loading ballCount={ballCount} />);
        const loadingElement = screen.getByTestId('loading');
        const balls = loadingElement.querySelectorAll('.rainbow-ball');
        expect(balls.length).toBe(ballCount);
    });

    // 测试自定义类名
    it('应该支持自定义类名', () => {
        const customClass = 'custom-loading';
        render(<Loading className={customClass} />);
        const loadingElement = screen.getByTestId('loading');
        expect(loadingElement).toHaveClass(customClass);
    });
});