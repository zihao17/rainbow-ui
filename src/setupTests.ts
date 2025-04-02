// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';

// 模拟 FontAwesome 图标
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: () => React.createElement('div', { 'data-testid': 'mock-icon' }),
}));

// 解决 axios 的 ES 模块问题
jest.mock('axios', () => {
  return {
    post: jest.fn(),
    defaults: { baseURL: '' },
    CancelToken: {
      source: () => ({
        token: 'mock-token',
        cancel: jest.fn(),
      }),
    },
  };
});

// 模拟 window.URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'mock-url');

// 设置 matchMedia mock (拖拽测试需要)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // 已废弃，但为兼容性保留
    removeListener: jest.fn(), // 已废弃，但为兼容性保留
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// 扩展 jest 匹配器
expect.extend({
  // 自定义匹配器，用于检查 FormData 内容
  toMatchFormData(received: FormData, expected: Record<string, any>) {
    const pass = Object.keys(expected).every(key => {
      return received.get(key) === expected[key];
    });

    if (pass) {
      return {
        message: () => `FormData contains expected values`,
        pass: true,
      };
    } else {
      return {
        message: () => `FormData does not contain expected values`,
        pass: false,
      };
    }
  },
});
