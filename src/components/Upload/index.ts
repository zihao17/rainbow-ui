import Dragger from './dragger';
import Upload, { UploadFile, UploadFileStatus, UploadProps } from './upload';

// 创建包含所有相关功能和类型的对象
const UploadPackage = Object.assign(Upload, {
  Dragger: Dragger,
  // 定义文件状态为对象而不是类型
  FileStatus: {
    Ready: 'ready' as UploadFileStatus,
    Uploading: 'uploading' as UploadFileStatus,
    Success: 'success' as UploadFileStatus,
    Error: 'error' as UploadFileStatus,
  },
});

// 导出单一默认对象
export default UploadPackage;

// 类型导出保留给 TypeScript 类型系统使用
export type { UploadFile, UploadFileStatus, UploadProps };
