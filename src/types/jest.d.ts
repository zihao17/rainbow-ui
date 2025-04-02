/// <reference types="jest" />

// 扩展Jest的期望类型，添加自定义匹配器
declare namespace jest {
  interface Matchers<R> {
    /**
     * 检查FormData是否包含预期键值对
     */
    toMatchFormData(expected: Record<string, any>): R;
  }
}
