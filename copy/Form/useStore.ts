import { useState, useReducer, useCallback } from 'react';

// 表单字段详情接口
export interface FieldDetail {
  name: string;
  value: any;
  rules?: RuleItem[];
  isValid: boolean;
  errors: string[];
  touched: boolean; // 标记字段是否被交互过
  validating: boolean; // 是否正在验证
}

// 验证规则接口
export interface RuleItem {
  required?: boolean;
  message?: string;
  type?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'email' | 'url';
  min?: number;
  max?: number;
  len?: number;
  pattern?: RegExp;
  validator?: (value: any) => Promise<void> | void;
}

// 字段状态集合
export interface FieldsState {
  [key: string]: FieldDetail;
}

// 表单状态接口
export interface FormState {
  isValid: boolean;
  isSubmitting: boolean;
  initialValues: Record<string, any>;
}

// 字段操作类型
export interface FieldsAction {
  type:
    | 'addField'
    | 'updateField'
    | 'validateField'
    | 'setFieldValue'
    | 'setErrors'
    | 'resetFields';
  name?: string;
  value?: any;
  rules?: RuleItem[];
  touched?: boolean;
  errors?: string[];
  isValid?: boolean;
  allFields?: FieldsState;
}

// 验证单个字段
const validateField = (value: any, rules?: RuleItem[]): string[] => {
  if (!rules || rules.length === 0) return [];

  const errors: string[] = [];

  rules.forEach(rule => {
    // 必填验证
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push(rule.message || '该字段为必填项');
    }

    // 字符串长度验证
    if (typeof value === 'string') {
      if (rule.min !== undefined && value.length < rule.min) {
        errors.push(rule.message || `长度不能小于${rule.min}个字符`);
      }
      if (rule.max !== undefined && value.length > rule.max) {
        errors.push(rule.message || `长度不能超过${rule.max}个字符`);
      }
      if (rule.len !== undefined && value.length !== rule.len) {
        errors.push(rule.message || `长度必须为${rule.len}个字符`);
      }
    }

    // 正则表达式验证
    if (rule.pattern && !rule.pattern.test(value)) {
      errors.push(rule.message || '格式不正确');
    }

    // 类型验证
    if (rule.type) {
      const typeError = validateType(value, rule.type);
      if (typeError) {
        errors.push(rule.message || typeError);
      }
    }
  });

  return errors;
};

// 类型验证
const validateType = (value: any, type: string): string | null => {
  if (value === undefined || value === null) return null;

  switch (type) {
    case 'string':
      return typeof value !== 'string' ? '必须是字符串类型' : null;
    case 'number':
      return typeof value !== 'number' ? '必须是数字类型' : null;
    case 'boolean':
      return typeof value !== 'boolean' ? '必须是布尔类型' : null;
    case 'array':
      return !Array.isArray(value) ? '必须是数组类型' : null;
    case 'object':
      return typeof value !== 'object' || Array.isArray(value) || value === null
        ? '必须是对象类型'
        : null;
    case 'email':
      return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '必须是有效的邮箱地址' : null;
    case 'url':
      return !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)
        ? '必须是有效的URL'
        : null;
    default:
      return null;
  }
};

// 字段状态reducer
function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case 'addField': {
      if (!action.name) return state;
      return {
        ...state,
        [action.name]: {
          name: action.name,
          value: action.value?.value || '',
          rules: action.rules || [],
          isValid: true,
          errors: [],
          touched: false,
          validating: false,
        },
      };
    }

    case 'updateField': {
      if (!action.name || !(action.name in state)) return state;
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          ...action.value,
          touched: action.touched !== undefined ? action.touched : state[action.name].touched,
        },
      };
    }

    case 'validateField': {
      if (!action.name || !(action.name in state)) return state;
      const field = state[action.name];
      const errors = validateField(field.value, field.rules);

      return {
        ...state,
        [action.name]: {
          ...field,
          isValid: errors.length === 0,
          errors,
          touched: true,
        },
      };
    }

    case 'setFieldValue': {
      if (!action.name || !(action.name in state)) return state;
      const currentField = state[action.name];
      const newErrors = validateField(action.value, currentField.rules);

      return {
        ...state,
        [action.name]: {
          ...currentField,
          value: action.value,
          isValid: newErrors.length === 0,
          errors: newErrors,
          touched: true,
        },
      };
    }

    case 'setErrors': {
      if (!action.name || !(action.name in state)) return state;
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          errors: action.errors || [],
          isValid: !(action.errors && action.errors.length > 0),
        },
      };
    }

    case 'resetFields': {
      if (action.allFields) {
        return action.allFields;
      }
      return Object.keys(state).reduce((acc, fieldName) => {
        acc[fieldName] = {
          ...state[fieldName],
          value: '',
          errors: [],
          isValid: true,
          touched: false,
        };
        return acc;
      }, {} as FieldsState);
    }

    default:
      return state;
  }
}

function useStore(initialValues: Record<string, any> = {}) {
  // 表单状态
  const [form, setForm] = useState<FormState>({
    isValid: true,
    isSubmitting: false,
    initialValues,
  });

  // 字段状态
  const [fields, dispatchFields] = useReducer(fieldsReducer, {});

  // 获取表单值
  const getFieldsValue = useCallback(() => {
    return Object.keys(fields).reduce(
      (values, fieldName) => {
        values[fieldName] = fields[fieldName].value;
        return values;
      },
      {} as Record<string, any>
    );
  }, [fields]);

  // 设置表单值
  const setFieldsValue = useCallback(
    (values: Record<string, any>) => {
      Object.keys(values).forEach(name => {
        if (name in fields) {
          dispatchFields({
            type: 'setFieldValue',
            name,
            value: values[name],
          });
        }
      });
    },
    [fields]
  );

  // 重置表单
  const resetFields = useCallback(() => {
    dispatchFields({
      type: 'resetFields',
    });
  }, []);

  // 验证表单
  const validateFields = useCallback(async () => {
    let formValid = true;
    const values: Record<string, any> = {};

    // 设置表单为提交中状态
    setForm(prev => ({ ...prev, isSubmitting: true }));

    // 验证所有字段
    for (const fieldName in fields) {
      dispatchFields({
        type: 'validateField',
        name: fieldName,
      });

      if (!fields[fieldName].isValid) {
        formValid = false;
      } else {
        values[fieldName] = fields[fieldName].value;
      }
    }

    // 更新表单状态
    setForm(prev => ({
      ...prev,
      isValid: formValid,
      isSubmitting: false,
    }));

    // 如果表单验证不通过，则抛出错误
    if (!formValid) {
      return Promise.reject({ values, errors: fields });
    }

    return Promise.resolve(values);
  }, [fields]);

  // 获取指定字段值
  const getFieldValue = useCallback(
    (name: string) => {
      return fields[name]?.value;
    },
    [fields]
  );

  // 设置指定字段值
  const setFieldValue = useCallback((name: string, value: any) => {
    dispatchFields({
      type: 'setFieldValue',
      name,
      value,
    });
  }, []);

  return {
    form,
    fields,
    dispatchFields,
    getFieldsValue,
    setFieldsValue,
    resetFields,
    validateFields,
    getFieldValue,
    setFieldValue,
  };
}

export default useStore;
