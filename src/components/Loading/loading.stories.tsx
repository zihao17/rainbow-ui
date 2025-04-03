import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Loading, { LoadingProps } from './loading';
import Button from '../Button';

export default {
    title: 'Components/Loading',
    component: Loading,
    argTypes: {
        isLoading: { control: 'boolean' },
        fullscreen: { control: 'boolean' },
        withMask: { control: 'boolean' },
        text: { control: 'text' },
        ballCount: { control: { type: 'range', min: 1, max: 12, step: 1 } },
    },
} as Meta;

// 基本用法
const Template: StoryFn<LoadingProps> = (args: LoadingProps) => <Loading {...args} />;

export const Default = Template.bind({});
Default.args = {
    isLoading: true,
    text: '加载中...',
};
Default.storyName = '基本用法';

// 自定义球体数量
export const CustomBallCount = Template.bind({});
CustomBallCount.args = {
    isLoading: true,
    ballCount: 5,
    text: '加载中...',
};
CustomBallCount.storyName = '自定义球体数量';

// 全屏加载
export const FullScreen: StoryFn<LoadingProps> = (args: LoadingProps) => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };

    return (
        <div>
            <Button onClick={startLoading}>显示全屏加载 (3秒)</Button>
            <Loading {...args} isLoading={loading} />
        </div>
    );
};

FullScreen.args = {
    fullscreen: true,
    withMask: true,
    text: '数据加载中，请稍候...',
};
FullScreen.storyName = '全屏加载';

// 包裹内容
export const WithContent: StoryFn<LoadingProps> = (args: LoadingProps) => {
    const [loading, setLoading] = useState(false);

    const toggleLoading = () => {
        setLoading(!loading);
    };

    const contentStyle = {
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '4px',
        minHeight: '200px',
    };

    return (
        <div>
            <Button onClick={toggleLoading} style={{ marginBottom: '20px' }}>
                {loading ? '隐藏加载' : '显示加载'}
            </Button>

            <Loading {...args} isLoading={loading}>
                <div style={contentStyle}>
                    <h3>内容区域</h3>
                    <p>这里是被 Loading 组件包裹的内容</p>
                    <p>当 isLoading 为 true 时，将显示加载状态</p>
                    <p>加载时内容区域可以被遮罩</p>
                </div>
            </Loading>
        </div>
    );
};

WithContent.args = {
    withMask: true,
    text: '加载中...',
};
WithContent.storyName = '包裹内容';

// 异步请求示例
export const AsyncRequest: StoryFn<LoadingProps> = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);

    const mockFetch = () => {
        return new Promise<any[]>((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: '项目 1' },
                    { id: 2, name: '项目 2' },
                    { id: 3, name: '项目 3' },
                ]);
            }, 2000);
        });
    };

    const handleFetch = async () => {
        setLoading(true);
        try {
            const result = await mockFetch();
            setData(result);
        } finally {
            setLoading(false);
        }
    };

    const contentStyle = {
        padding: '20px',
        border: '1px solid #eee',
        borderRadius: '4px',
        minHeight: '200px',
    };

    return (
        <div>
            <Button onClick={handleFetch} style={{ marginBottom: '20px' }}>
                获取数据 (模拟异步请求)
            </Button>

            <Loading isLoading={loading} withMask={true} text="数据加载中...">
                <div style={contentStyle}>
                    {data.length > 0 ? (
                        <ul>
                            {data.map((item) => (
                                <li key={item.id}>{item.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>点击按钮获取数据</p>
                    )}
                </div>
            </Loading>
        </div>
    );
};

AsyncRequest.storyName = '异步请求示例';