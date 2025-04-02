import React from 'react';
import { render, fireEvent, RenderResult, screen, waitFor } from '@testing-library/react';
import Select, { SelectProps, SelectMode } from './select';

const defaultProps: SelectProps = {
    options: [
        { value: 'option1', label: '选项一' },
        { value: 'option2', label: '选项二' },
        { value: 'option3', label: '选项三' },
    ],
    placeholder: '请选择'
};

const multipleProps: SelectProps = {
    ...defaultProps,
    mode: SelectMode.Multiple
};

describe('测试 Select 组件', () => {
    // 测试单选基本渲染
    it('应该正确渲染单选Select组件', () => {
        const { getByText } = render(<Select {...defaultProps} />);
        expect(getByText('请选择')).toBeInTheDocument();
    });

    // 测试禁用状态
    it('禁用的Select组件点击不应该展示下拉菜单', () => {
        const { container, queryByText } = render(<Select {...defaultProps} disabled />);

        // 检查是否有禁用类名
        expect(container.querySelector('.rainbow-select')?.classList.contains('is-disabled')).toBeTruthy();

        // 点击Select
        const selectElement = container.querySelector('.rainbow-select');
        if (selectElement) {
            fireEvent.click(selectElement);
        }

        // 下拉菜单不应该出现
        expect(queryByText('选项一')).not.toBeInTheDocument();
    });

    // 测试下拉菜单打开
    it('点击Select应该展示下拉菜单', async () => {
        const { container, getByText } = render(<Select {...defaultProps} />);

        // 点击Select
        const selectElement = container.querySelector('.rainbow-select');
        if (selectElement) {
            fireEvent.click(selectElement);
        }

        // 等待过渡动画
        await waitFor(() => {
            expect(getByText('选项一')).toBeInTheDocument();
            expect(getByText('选项二')).toBeInTheDocument();
            expect(getByText('选项三')).toBeInTheDocument();
        });
    });

    // 测试单选选择功能
    it('单选模式下点击选项应该选中并关闭下拉菜单', async () => {
        const mockFn = jest.fn();
        const { container, getByText } = render(<Select {...defaultProps} onChange={mockFn} />);

        // 点击Select打开下拉
        const selectElement = container.querySelector('.rainbow-select');
        if (selectElement) {
            fireEvent.click(selectElement);
        }

        // 点击选项
        await waitFor(() => {
            const option = getByText('选项二');
            fireEvent.click(option);
        });

        // 验证选中状态和回调
        expect(mockFn).toHaveBeenCalledWith('option2', expect.anything());
        expect(getByText('选项二')).toBeInTheDocument();

        // 验证下拉菜单已关闭
        await waitFor(() => {
            const dropdownElement = container.querySelector('.rainbow-select-dropdown');
            expect(dropdownElement).not.toBeVisible();
        });
    });

    // 测试多选基本渲染
    it('应该正确渲染多选Select组件', () => {
        const { getByText } = render(<Select {...multipleProps} />);
        expect(getByText('请选择')).toBeInTheDocument();
    });

    // 测试多选选择功能
    it('多选模式下点击选项应该选中并显示标签', async () => {
        const mockFn = jest.fn();
        const { container, getByText } = render(<Select {...multipleProps} onChange={mockFn} />);

        // 点击Select打开下拉
        const selectElement = container.querySelector('.rainbow-select');
        if (selectElement) {
            fireEvent.click(selectElement);
        }

        // 点击选项
        await waitFor(() => {
            const option = getByText('选项一');
            fireEvent.click(option);
        });

        // 验证选中状态和回调
        expect(mockFn).toHaveBeenCalledWith(['option1'], expect.anything());
        expect(container.querySelector('.rainbow-select-tag')).toBeInTheDocument();
        expect(getByText('选项一')).toBeInTheDocument();

        // 验证下拉菜单仍然开启
        await waitFor(() => {
            const dropdownElement = container.querySelector('.rainbow-select-dropdown');
            expect(dropdownElement).toBeVisible();
        });

        // 点击另一个选项
        await waitFor(() => {
            const option = getByText('选项三');
            fireEvent.click(option);
        });

        // 验证又一次选中和回调
        expect(mockFn).toHaveBeenLastCalledWith(['option1', 'option3'], expect.anything());
        expect(container.querySelectorAll('.rainbow-select-tag').length).toBe(2);
    });

    // 测试多选删除标签
    it('多选模式下点击标签删除图标应该删除选中项', async () => {
        const mockFn = jest.fn();
        const { container, getByText } = render(
            <Select {...multipleProps} defaultValue={['option1', 'option2']} onChange={mockFn} />
        );

        // 验证初始状态
        expect(container.querySelectorAll('.rainbow-select-tag').length).toBe(2);

        // 点击第一个标签的删除图标
        const removeButton = container.querySelector('.rainbow-select-tag-remove');
        if (removeButton) {
            fireEvent.click(removeButton);
        }

        // 验证标签被删除
        expect(mockFn).toHaveBeenCalled();
        expect(container.querySelectorAll('.rainbow-select-tag').length).toBe(1);
    });

    // 测试禁用选项
    it('点击禁用的选项不应该触发选择', async () => {
        const mockFn = jest.fn();
        const disabledOptions = [
            { value: 'option1', label: '选项一' },
            { value: 'option2', label: '选项二', disabled: true },
            { value: 'option3', label: '选项三' },
        ];

        const { container, getByText } = render(
            <Select {...defaultProps} options={disabledOptions} onChange={mockFn} />
        );

        // 点击Select打开下拉
        const selectElement = container.querySelector('.rainbow-select');
        if (selectElement) {
            fireEvent.click(selectElement);
        }

        // 点击禁用选项
        await waitFor(() => {
            const option = getByText('选项二');
            fireEvent.click(option);
        });

        // 验证未触发选择
        expect(mockFn).not.toHaveBeenCalled();
        expect(getByText('请选择')).toBeInTheDocument();
    });
});