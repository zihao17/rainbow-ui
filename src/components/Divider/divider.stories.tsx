import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Divider, { DividerDirection, DividerStyle, TextAlign } from './divider';

import Icon from '../Icon/icon';

const meta: Meta<typeof Divider> = {
    title: 'Components/Divider 分割线',
    component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

// 默认分割线
export const Default: Story = {
    render: () => (
        <>
            <p>这是一个默认的水平分割线，彩虹风格</p>
            <Divider />
            <p>分割线下方的内容</p>
        </>
    ),
};

// 简约风格分割线
export const Simple: Story = {
    render: () => (
        <>
            <p>这是一个简约风格的水平分割线</p>
            <Divider dividerStyle={DividerStyle.Simple} />
            <p>分割线下方的内容</p>
        </>
    ),
};

// Normal风格分割线
export const Normal: Story = {
    render: () => (
        <>
            <p>这是一个Normal风格的水平分割线</p>
            <Divider dividerStyle={DividerStyle.Normal} />
            <p>这是一个带文本的Normal分割线</p>
            <Divider dividerStyle={DividerStyle.Normal}>Normal文本</Divider>
            <p>这是一个虚线样式的Normal分割线</p>
            <Divider dividerStyle={DividerStyle.Normal} dashed />
            <p>分割线下方的内容</p>
        </>
    ),
};

// 虚线分割线
export const Dashed: Story = {
    render: () => (
        <>
            <p>这是一个虚线样式的分割线</p>
            <Divider dashed />
            <p>这是一个简约风格的虚线分割线</p>
            <Divider dividerStyle={DividerStyle.Simple} dashed />
            <p>分割线下方的内容</p>
        </>
    ),
};

// 带文本的分割线
export const WithText: Story = {
    render: () => (
        <>
            <p>这是带文本的分割线（居中对齐）</p>
            <Divider>Rainbow UI</Divider>
            <p>这是带文本的分割线（左对齐）</p>
            <Divider textAlign={TextAlign.Left}>左对齐文本</Divider>
            <p>这是带文本的分割线（右对齐）</p>
            <Divider textAlign={TextAlign.Right}>右对齐文本</Divider>
            <p>分割线下方的内容</p>
        </>
    ),
};

// 带图标的分割线
export const WithIcon: Story = {
    render: () => (
        <>
            <p>这是带图标的分割线</p>
            <Divider>
                <Icon icon="coffee" />
            </Divider>
            <p>这是带图标和文本的分割线</p>
            <Divider>
                <Icon icon="star" /> Rainbow UI <Icon icon="star" />
            </Divider>
            <p>分割线下方的内容</p>
        </>
    ),
};

// 垂直分割线
export const Vertical: Story = {
    render: () => (
        <div style={{ height: '100px', display: 'flex', alignItems: 'center' }}>
            <span>文本</span>
            <Divider direction={DividerDirection.Vertical} />
            <span>文本</span>
            <Divider direction={DividerDirection.Vertical} dividerStyle={DividerStyle.Simple} />
            <span>文本</span>
            <Divider direction={DividerDirection.Vertical} dashed />
            <span>文本</span>
        </div>
    ),
};

// 自定义样式分割线
export const CustomStyle: Story = {
    render: () => (
        <>
            <p>自定义颜色的分割线</p>
            <Divider dividerStyle={DividerStyle.Simple} color="#ff6b6b" />
            <p>自定义尺寸的分割线</p>
            <Divider dividerStyle={DividerStyle.Simple} color="#4ecdc4" size="3px" />
            <p>自定义长度的分割线</p>
            <Divider dividerStyle={DividerStyle.Simple} color="#1a535c" length="50%" />
            <p>分割线下方的内容</p>
        </>
    ),
};