import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Input, InputProps } from './input';

// 模拟 FontAwesome 图标
jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: (props: any) => <span data-testid="mock-icon">{props.icon}</span>
}));

describe('测试 Input 组件', () => {
    // 基础输入框测试
    it('应该正确渲染默认输入框', () => {
        const { getByTestId } = render(<Input data-testid="test-input" />);
        const inputElement = getByTestId('test-input');
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveClass('rainbow-input-inner');
    });

    // 禁用状态测试
    it('应该正确渲染禁用状态的输入框', () => {
        const { getByTestId, container } = render(<Input disabled data-testid="test-input" />);
        const inputElement = getByTestId('test-input');
        expect(inputElement).toBeDisabled();
        expect(container.firstChild).toHaveClass('is-disabled');
    });

    // 尺寸测试
    it('应该渲染不同尺寸的输入框', () => {
        const { container, rerender } = render(<Input size="lg" />);
        expect(container.firstChild).toHaveClass('input-size-lg');

        rerender(<Input size="sm" />);
        expect(container.firstChild).toHaveClass('input-size-sm');
    });

    // 带图标测试
    it('应该渲染带图标的输入框', () => {
        const { container, getByTestId } = render(<Input icon="search" />);
        expect(container.firstChild).toHaveClass('input-with-icon');
        expect(getByTestId('mock-icon')).toBeInTheDocument();
    });

    // 前缀和后缀测试
    it('应该渲染带前缀的输入框', () => {
        const { container, getByText } = render(<Input prepend="https://" />);
        expect(container.firstChild).toHaveClass('input-group');
        expect(container.firstChild).toHaveClass('input-group-prepend');
        expect(getByText('https://')).toBeInTheDocument();
    });

    it('应该渲染带后缀的输入框', () => {
        const { container, getByText } = render(<Input append=".com" />);
        expect(container.firstChild).toHaveClass('input-group');
        expect(container.firstChild).toHaveClass('input-group-append');
        expect(getByText('.com')).toBeInTheDocument();
    });

    // 事件测试
    it('应该支持onChange事件', () => {
        const onChange = jest.fn();
        const { getByTestId } = render(<Input data-testid="test-input" onChange={onChange} />);
        const inputElement = getByTestId('test-input');

        // 模拟输入
        fireEvent.change(inputElement, { target: { value: 'test value' } });
        expect(onChange).toHaveBeenCalled();
        expect(inputElement).toHaveValue('test value');
    });
});
