import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faEye } from '@fortawesome/free-solid-svg-icons'
library.add(fas, faEye)
import axios from 'axios'
import './App.css';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import AlertDemo from './components/Alert/demo';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';
import Input from './components/Input/input';
import Select, { SelectMode } from './components/Select/select';
import Upload, { UploadFile } from './components/Upload/upload';
import './components/Upload/upload.scss';

function App() {
  // 添加一个状态来控制直接使用的Alert显示
  const [showBasicAlert, setShowBasicAlert] = useState(false);
  const [show, setShow] = useState(false);

  // 选择器选项数据
  const selectOptions = [
    { value: 'option1', label: '选项一' },
    { value: 'option2', label: '选项二' },
    { value: 'option3', label: '选项三' },
    { value: 'option4', label: '选项四', disabled: true },
    { value: 'option5', label: '选项五' },
  ];

  const postData = {
    title: 'postTest',
    body: 'this is my test post'
  }

  useEffect(() => {
    axios.post('https://run.mocky.io/v3/a87d0888-2f52-4452-8d98-4fb923110b43/get/1/2/3', postData)
      .then(resp => {
        console.log(resp);
        console.log(resp.data);
      })
      .catch(error => {
        console.error('请求出错:', error);
      });
    console.log('666')
  })

  // 上传组件示例 - 默认文件列表
  const defaultFileList: UploadFile[] = [
    { uid: '1', size: 1234, name: '示例文件1.pdf', status: 'success' },
    { uid: '2', size: 2345, name: '示例文件2.jpg', status: 'error' },
    { uid: '3', size: 3456, name: '示例文件3.png', status: 'uploading', percent: 30 }
  ];

  // 上传前检查文件
  const checkFileBeforeUpload = (file: File) => {
    // 检查文件类型
    const isImage = file.type.includes('image');
    if (!isImage) {
      alert('只能上传图片文件！');
      return false;
    }

    // 检查文件大小
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert('图片大小不能超过2MB！');
      return false;
    }

    // 修改文件名
    // 返回 Promise 来符合 beforeUpload 的类型定义
    return new Promise<File>((resolve) => {
      const modifiedFile = new File([file], `rainbow_${file.name}`, { type: file.type });
      resolve(modifiedFile);
    });
  };

  // 处理文件上传进度
  const handleProgress = (percentage: number, file: File) => {
    console.log(`正在上传 ${file.name}, 进度: ${percentage}%`);
  };

  // 处理上传成功
  const handleSuccess = (data: any, file: File) => {
    console.log(`${file.name} 上传成功:`, data);
  };

  // 处理上传失败
  const handleError = (err: any, file: File) => {
    console.error(`${file.name} 上传失败:`, err);
  };

  // 处理文件移除
  const handleRemove = (file: UploadFile) => {
    console.log(`移除文件: ${file.name}`);
  };

  return (
    <div className="App">
      <h1>Hello this is rainbow-ui</h1>
      <Icon icon="coffee" size='10x' />
      <Icon icon="arrow-down" theme='primary' size='10x' />
      <Icon icon="arrow-up" theme='warning' size='10x' />
      <h2>按钮组件</h2>
      <Button>Hello</Button>
      <Button className="custom" autoFocus>AutoFocus</Button>
      <Button onClick={() => alert('clicked')}>Click</Button>
      <Button size={ButtonSize.Large}>LG</Button>
      <Button size={ButtonSize.Small}>SM</Button>
      <Button btnType={ButtonType.Primary}>Primary</Button>
      <Button btnType={ButtonType.Danger}>Danger</Button>
      <Button disabled>Disabled</Button>
      <Button disabled btnType={ButtonType.Danger}>Disabled Danger</Button>
      <Button btnType={ButtonType.Link} href="https://www.baidu.com">Link</Button>
      <Button btnType={ButtonType.Danger}>Success</Button>

      <AlertDemo />

      <Button btnType={ButtonType.Primary} onClick={() => setShowBasicAlert(true)}>
        显示基础 Alert
      </Button>

      {showBasicAlert && (
        <Alert
          title="这是一个直接使用的 Alert"
          description="在任何组件中，你都可以通过这种方式使用 Alert 组件"
          type={AlertType.Success}
          onClose={() => setShowBasicAlert(false)}
        />
      )}

      <h2>菜单组件</h2>
      <Menu defaultIndex={0} onSelect={(index) => { console.log(index) }}>
        <MenuItem>首页</MenuItem>
        <MenuItem>产品</MenuItem>
        <MenuItem>关于我们</MenuItem>
        <MenuItem disabled>联系我们</MenuItem>
        <SubMenu title="下拉菜单">
          <MenuItem>产品1</MenuItem>
          <MenuItem>产品2</MenuItem>
          <MenuItem>产品3</MenuItem>
        </SubMenu>
      </Menu>

      <h4>垂直菜单组件</h4>
      <Menu mode="vertical" defaultIndex={0} onSelect={(index) => { console.log(index) }}>
        <MenuItem>首页</MenuItem>
        <MenuItem>产品</MenuItem>
        <MenuItem>关于我们</MenuItem>
        <SubMenu title="下拉菜单">
          <MenuItem>产品4</MenuItem>
          <MenuItem>产品5</MenuItem>
          <MenuItem>产品6</MenuItem>
        </SubMenu>
      </Menu>

      <h4>测试transition组件</h4>
      <Button btnType={ButtonType.Primary} onClick={() => setShow(!show)}>click to toggle</Button>
      <Transition in={show} timeout={300} animation="zoom-in-left">
        <div>
          <h4>动画</h4>
          <p>6666666</p>
          <p>hhh</p>
          <Button onClick={() => setShow(!show)}>toggle2</Button>
          <Menu defaultIndex={0} onSelect={(index) => { console.log(index) }}>
            <MenuItem>首页</MenuItem>
            <MenuItem>产品</MenuItem>
            <MenuItem>关于我们</MenuItem>
            <MenuItem disabled>联系我们</MenuItem>
            <SubMenu title="下拉菜单">
              <MenuItem>产品1</MenuItem>
              <MenuItem>产品2</MenuItem>
              <MenuItem>产品3</MenuItem>
            </SubMenu>
          </Menu>
        </div>
      </Transition>

      <h4>输入框组件</h4>
      <Input />
      <Input size="lg" />
      <Input size="sm" />
      <Input icon="coffee" />
      <Input prepend="https://" />
      <Input append=".com" />
      <Input prepend="https://" append=".com" />
      <Input type="password" icon={faEye} />

      <h4>选择器组件</h4>
      <div style={{ maxWidth: '400px' }}>
        <Select
          options={selectOptions}
          placeholder="请点击选择"
          size='small'
        />
        <Select
          options={selectOptions}
          placeholder="禁用状态的选择器"
          disabled
        />
        <p>带默认值的多选</p>
        <Select
          mode={SelectMode.Multiple}
          options={selectOptions}
          defaultValue={['option1', 'option3']}
          onChange={(values, selectedOptions) => console.log('多选值变化:', values, selectedOptions)}
        />
      </div>

      <div style={{ maxWidth: '500px' }} >
        <h4>文件上传组件</h4>
        <h5>1. 基本上传功能</h5>
        <Upload
          action="https://run.mocky.io/v3/a87d0888-2f52-4452-8d98-4fb923110b43"
          onChange={file => console.log('文件状态变化:', file.name)}
          onRemove={handleRemove}
          name="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif"
          beforeUpload={checkFileBeforeUpload}
          onProgress={handleProgress}
          onSuccess={handleSuccess}
          onError={handleError}
        />

        <h5>2. 拖拽上传</h5>
        <Upload
          action="https://run.mocky.io/v3/a87d0888-2f52-4452-8d98-4fb923110b43"
          onChange={file => console.log('文件状态变化:', file.name)}
          onRemove={handleRemove}
          name="file"
          multiple
          drag
        >
          <Icon icon="upload" size="3x" theme="secondary" />
          <h4>拖拽文件到这里上传</h4>
          <p>或点击选择文件</p>
        </Upload>

        <h5>3. 自定义文件列表</h5>
        <Upload
          action="https://run.mocky.io/v3/a87d0888-2f52-4452-8d98-4fb923110b43"
          onChange={file => console.log('文件状态变化:', file.name)}
          onRemove={handleRemove}
          defaultFileList={defaultFileList}
          name="fileData"
          data={{ source: 'rainbow-ui-demo' }}
          headers={{ 'X-Custom-Header': 'rainbow-upload' }}
          withCredentials
        />

        <h5>4. 高级配置示例</h5>
        <p style={{ color: '#666', margin: '0 0 15px', fontSize: '14px' }}>
          此示例限制上传图片数量为3张，文件大小不超过5MB
        </p>
        <Upload
          action="https://run.mocky.io/v3/a87d0888-2f52-4452-8d98-4fb923110b43"
          onChange={file => console.log('文件状态变化:', file.name)}
          onRemove={handleRemove}
          name="image"
          accept="image/*"
          multiple
          beforeUpload={(file) => {
            // 限制上传数量
            if (defaultFileList.length >= 3) {
              alert('最多只能上传3个文件！');
              return false;
            }

            // 限制文件大小为5MB
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
              alert('文件大小不能超过5MB！');
              return false;
            }

            // 显示上传进度提示
            alert(`开始上传文件: ${file.name}，大小: ${(file.size / 1024).toFixed(2)}KB`);
            return true;
          }}
          headers={{
            'Authorization': 'Bearer sample-token-for-demo',
            'X-Request-Source': 'rainbow-ui'
          }}
          data={{
            uploadTime: Date.now(),
            source: 'rainbow-demo',
            userId: 'demo-user-001'
          }}
        />
      </div>

      <hr />
      <p>END</p>
    </div>
  );
}

export default App;
