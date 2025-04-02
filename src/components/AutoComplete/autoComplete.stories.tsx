import type { Meta, StoryObj } from '@storybook/react';
import React, { ReactElement } from 'react';
import { AutoComplete, DataSourceType } from './autoComplete';
import Icon from '../Icon';

// 城市数据类型
interface CityProps {
    value: string;
    population: number;
    country: string;
}

// 汽车数据类型
interface CarProps {
    value: string;
    brand: string;
    year: number;
}

// 组件文档信息
const meta: Meta<typeof AutoComplete> = {
    title: 'Components/AutoComplete',
    component: AutoComplete,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
自动完成组件，支持同步和异步数据源、键盘导航、自定义渲染等功能。

## 引入方式

\`\`\`jsx
import { AutoComplete } from 'rainbow-ui'
\`\`\`

## 基本用法

\`\`\`jsx
<AutoComplete
  fetchSuggestions={handleSearch}
  onSelect={handleSelect}
  placeholder="输入关键词"
/>
\`\`\`
        `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        fetchSuggestions: {
            description: '获取输入建议的函数，可以是同步或异步的',
            table: {
                type: { summary: '(str: string) => DataSourceType[] | Promise<DataSourceType[]>' },
            },
        },
        onSelect: {
            description: '选择建议项时触发的回调',
            table: {
                type: { summary: '(item: DataSourceType) => void' },
            },
        },
        onChange: {
            description: '输入框内容变化时触发的回调',
            table: {
                type: { summary: '(value: string) => void' },
            },
        },
        renderOption: {
            description: '自定义渲染下拉选项的函数',
            table: {
                type: { summary: '(item: DataSourceType) => ReactElement' },
            },
        },
        debounceDelay: {
            description: '防抖延迟时间（毫秒）',
            control: 'number',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '300' },
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

/**
 * 自动完成组件示例
 *
 * ## 引入AutoComplete
 * ```jsx
 * import { AutoComplete } from 'rainbow-ui'
 * ```
 */

// 基础用法
export const Basic: Story = {
    name: '基础用法',
    args: {
        placeholder: '请输入城市名称',
    },
    render: (args) => {
        // 简单字符串列表示例
        const cities = ['北京', '上海', '广州', '深圳', '杭州', '南京', '武汉', '西安', '成都', '重庆'];

        // 简单字符串搜索
        const handleSimpleSearch = (query: string) => {
            return cities
                .filter(city => city.includes(query))
                .map(city => ({ value: city }));
        };

        // 选择处理函数
        const handleSelect = (item: DataSourceType) => {
            console.log('选中项:', item);
        };

        return (
            <div style={{ width: '300px' }}>
                <AutoComplete
                    {...args}
                    fetchSuggestions={handleSimpleSearch}
                    onSelect={handleSelect}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: '基础的自动完成功能，输入中文城市名称，会显示匹配的城市列表。',
            },
        },
    },
};

// 自定义渲染
export const CustomRender: Story = {
    name: '自定义渲染',
    args: {
        placeholder: '请输入汽车品牌',
    },
    render: (args) => {
        // 汽车数据
        const cars = [
            { value: '奔驰', brand: 'Mercedes-Benz', year: 1926 },
            { value: '宝马', brand: 'BMW', year: 1916 },
            { value: '奥迪', brand: 'Audi', year: 1909 },
            { value: '特斯拉', brand: 'Tesla', year: 2003 },
            { value: '保时捷', brand: 'Porsche', year: 1931 },
            { value: '法拉利', brand: 'Ferrari', year: 1947 },
            { value: '兰博基尼', brand: 'Lamborghini', year: 1963 },
        ];

        // 汽车搜索
        const handleCarSearch = (query: string): DataSourceType[] => {
            return cars
                .filter(car =>
                    car.value.includes(query) ||
                    (car.brand as string).toLowerCase().includes(query.toLowerCase())
                ) as any as DataSourceType[];
        };

        // 自定义渲染汽车选项
        const renderCarOption = (item: DataSourceType) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.value}</span>
                    <span style={{ color: '#999' }}>
                        {(item as any).brand} ({(item as any).year})
                    </span>
                </div>
            );
        };

        // 选择处理函数
        const handleSelect = (item: DataSourceType) => {
            console.log('选中项:', item);
        };

        return (
            <div style={{ width: '300px' }}>
                <AutoComplete
                    {...args}
                    fetchSuggestions={handleCarSearch}
                    onSelect={handleSelect}
                    renderOption={renderCarOption}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: '自定义渲染下拉选项。可以使用 `renderOption` 属性来自定义每个选项的渲染方式。在这个例子中，我们展示了汽车品牌的中文名和英文名及创建年份。',
            },
        },
    },
};

// 异步搜索
export const AsyncSearch: Story = {
    name: '异步搜索',
    args: {
        placeholder: '请输入城市或国家名称',
        debounceDelay: 500,
    },
    render: (args) => {
        // 城市数据
        const cities = [
            { value: '北京', population: 21500000, country: '中国' },
            { value: '上海', population: 24200000, country: '中国' },
            { value: '广州', population: 15300000, country: '中国' },
            { value: '深圳', population: 12500000, country: '中国' },
            { value: '纽约', population: 8400000, country: '美国' },
            { value: '洛杉矶', population: 4000000, country: '美国' },
            { value: '芝加哥', population: 2700000, country: '美国' },
            { value: '东京', population: 13900000, country: '日本' },
            { value: '伦敦', population: 8900000, country: '英国' },
            { value: '巴黎', population: 2100000, country: '法国' },
            { value: '柏林', population: 3600000, country: '德国' },
        ];

        // 异步搜索示例 - 城市
        const handleAsyncSearch = (query: string): Promise<DataSourceType[]> => {
            // 模拟API请求
            return new Promise<DataSourceType[]>((resolve) => {
                console.log('Searching for:', query);

                setTimeout(() => {
                    const results = cities
                        .filter(city =>
                            city.value.includes(query) ||
                            (city.country as string).toLowerCase().includes(query.toLowerCase())
                        ) as any as DataSourceType[];
                    resolve(results);
                }, 1000); // 1秒延迟模拟网络请求
            });
        };

        // 自定义渲染城市选项
        const renderCityOption = (item: DataSourceType): ReactElement => {
            return (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                        <Icon icon="map-marker-alt" /> {item.value}
                    </span>
                    <span style={{ color: '#999' }}>
                        {(item as any).country} - {((item as any).population / 1000000).toFixed(1)}百万人口
                    </span>
                </div>
            );
        };

        // 选择处理函数
        const handleSelect = (item: DataSourceType) => {
            console.log('选中项:', item);
        };

        return (
            <div style={{ width: '300px' }}>
                <p style={{ color: '#666', marginBottom: '8px', fontSize: '12px' }}>
                    输入关键词后有1秒延迟，模拟异步请求
                </p>
                <AutoComplete
                    {...args}
                    fetchSuggestions={handleAsyncSearch}
                    onSelect={handleSelect}
                    renderOption={renderCityOption}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: '支持异步搜索。`fetchSuggestions` 可以返回一个 Promise，组件会自动处理加载状态，并在请求完成后显示结果。在这个例子中，我们模拟了一个网络请求，有1秒的延迟。',
            },
        },
    },
};

// 键盘导航
export const KeyboardNavigation: Story = {
    name: '键盘导航',
    args: {
        placeholder: '输入水果名称(可使用键盘上下键选择)',
    },
    render: (args) => {
        // 水果列表
        const fruits = ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓', '蓝莓', '芒果', '菠萝', '樱桃'];

        // 搜索函数
        const handleFruitSearch = (query: string) => {
            return fruits
                .filter(fruit => fruit.includes(query))
                .map(fruit => ({ value: fruit }));
        };

        // 选择处理函数
        const handleSelect = (item: DataSourceType) => {
            console.log('选中项:', item);
        };

        return (
            <div style={{ width: '300px' }}>
                <p style={{ color: '#666', marginBottom: '8px', fontSize: '12px' }}>
                    输入后，使用键盘上下箭头选择，回车确认
                </p>
                <AutoComplete
                    {...args}
                    fetchSuggestions={handleFruitSearch}
                    onSelect={handleSelect}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: '支持键盘导航。输入关键词后，可以使用键盘上下箭头选择建议项，按回车键确认选择，按ESC键关闭下拉列表。',
            },
        },
    },
};
