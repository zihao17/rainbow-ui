import type { Meta, StoryObj } from '@storybook/react';
import Icon from '../Icon';
import AutoComplete from './autoComplete';

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
    title: 'Components/AutoComplete 自动补全',
    component: AutoComplete,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
自动完成组件，支持同步和异步数据源、键盘导航、自定义渲染等功能。

## 引入方式

\`\`\`jsx
import AutoComplete from 'rainbow-ui'
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
 * import AutoComplete from 'rainbow-ui'
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
                .map(city => AutoComplete.DataSourceType.create(city));
        };

        // 选择处理函数
        const handleSelect = (item: any) => {
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
        const handleCarSearch = (query: string) => {
            return cars
                .filter(car =>
                    car.value.includes(query) ||
                    (car.brand as string).toLowerCase().includes(query.toLowerCase())
                );
        };

        // 自定义渲染汽车选项
        const renderCarOption = (item: any) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.value}</span>
                    <span style={{ color: '#999' }}>
                        {item.brand} ({item.year})
                    </span>
                </div>
            );
        };

        // 选择处理函数
        const handleSelect = (item: any) => {
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

// 异步查询
export const AsyncSearch: Story = {
    name: '异步数据源',
    args: {
        placeholder: '输入城市名称进行搜索（有1秒延迟）',
    },
    render: (args) => {
        // 城市数据
        const cities = [
            { value: '北京', population: 21.54, country: '中国' },
            { value: '上海', population: 24.28, country: '中国' },
            { value: '广州', population: 15.31, country: '中国' },
            { value: '深圳', population: 13.44, country: '中国' },
            { value: '纽约', population: 8.4, country: '美国' },
            { value: '伦敦', population: 8.9, country: '英国' },
            { value: '东京', population: 13.96, country: '日本' },
            { value: '巴黎', population: 2.16, country: '法国' },
            { value: '柏林', population: 3.67, country: '德国' },
            { value: '悉尼', population: 5.23, country: '澳大利亚' },
        ];

        // 异步搜索示例 - 城市
        const handleAsyncSearch = (query: string) => {
            // 模拟API请求
            return new Promise<any[]>((resolve) => {
                console.log('Searching for:', query);

                setTimeout(() => {
                    const results = cities
                        .filter(city =>
                            city.value.includes(query) ||
                            (city.country as string).toLowerCase().includes(query.toLowerCase())
                        );
                    resolve(results);
                }, 1000); // 1秒延迟模拟网络请求
            });
        };

        // 自定义渲染城市选项
        const renderCityOption = (item: any) => {
            return (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>
                        <Icon icon="city" style={{ marginRight: '8px' }} />
                        {item.value}
                    </span>
                    <span style={{ color: '#999' }}>
                        {item.country} | {item.population}百万人
                    </span>
                </div>
            );
        };

        // 选择处理函数
        const handleSelect = (item: any) => {
            console.log('选中项:', item);
        };

        return (
            <div style={{ width: '300px' }}>
                <AutoComplete
                    {...args}
                    fetchSuggestions={handleAsyncSearch}
                    onSelect={handleSelect}
                    renderOption={renderCityOption}
                    debounceDelay={500}
                />
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: '异步获取数据源示例。fetchSuggestions 可以返回一个 Promise，处理异步请求，在请求过程中会显示加载指示器。',
            },
        },
    },
};

// 带图标提示
export const WithIcon: Story = {
    name: '带图标的输入框',
    args: {
        placeholder: '请输入水果名称',
        icon: 'search',
    },
    render: (args) => {
        // 水果数据
        const fruits = ['苹果', '香蕉', '橙子', '葡萄', '西瓜', '草莓', '蓝莓', '柠檬', '猕猴桃'];

        // 水果搜索
        const handleFruitSearch = (query: string) => {
            return fruits
                .filter(fruit => fruit.includes(query))
                .map(fruit => ({ value: fruit }));
        };

        // 选择处理函数
        const handleSelect = (item: any) => {
            console.log('选中项:', item);
        };

        return (
            <div style={{ width: '300px' }}>
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
                story: '带搜索图标的输入框。可以设置 icon 属性为 "search" 添加搜索图标。',
            },
        },
    },
};
