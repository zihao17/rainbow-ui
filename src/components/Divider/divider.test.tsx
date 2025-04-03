import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import Divider from './divider';
import { DividerDirection, DividerStyle, TextAlign } from './divider';

describe('Divider 组件测试', () => {
    let wrapper: RenderResult;

    it('默认分割线渲染正确', () => {
        wrapper = render(<Divider />);
        const divider = wrapper.container.querySelector('.rainbow-divider');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass('rainbow-divider-horizontal');
        expect(divider).toHaveClass('rainbow-divider-rainbow');
    });

    it('垂直分割线渲染正确', () => {
        wrapper = render(<Divider direction={DividerDirection.Vertical} />);
        const divider = wrapper.container.querySelector('.rainbow-divider');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass('rainbow-divider-vertical');
    });

    it('简约风格分割线渲染正确', () => {
        wrapper = render(<Divider dividerStyle={DividerStyle.Simple} />);
        const divider = wrapper.container.querySelector('.rainbow-divider');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass('rainbow-divider-simple');
    });

    it('虚线分割线渲染正确', () => {
        wrapper = render(<Divider dashed />);
        const divider = wrapper.container.querySelector('.rainbow-divider');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass('rainbow-divider-dashed');
    });

    it('带文本的分割线渲染正确', () => {
        const text = 'Rainbow UI';
        wrapper = render(<Divider>{text}</Divider>);
        const divider = wrapper.container.querySelector('.rainbow-divider');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass('rainbow-divider-with-text');
        const innerText = wrapper.container.querySelector('.rainbow-divider-inner-text');
        expect(innerText).toBeInTheDocument();
        expect(innerText?.textContent).toBe(text);
    });

    it('带对齐属性的分割线渲染正确', () => {
        wrapper = render(<Divider textAlign={TextAlign.Left}>左对齐</Divider>);
        const divider = wrapper.container.querySelector('.rainbow-divider');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveClass('rainbow-divider-with-text-left');
    });

    it('自定义样式的分割线渲染正确', () => {
        const color = '#ff6b6b';
        const size = '3px';
        const length = '50%';
        wrapper = render(<Divider dividerStyle={DividerStyle.Simple} color={color} size={size} length={length} />);
        const divider = wrapper.container.querySelector('.rainbow-divider');
        expect(divider).toBeInTheDocument();
        expect(divider).toHaveStyle(`background-color: ${color}`);
        expect(divider).toHaveStyle(`height: ${size}`);
        expect(divider).toHaveStyle(`width: ${length}`);
    });
});