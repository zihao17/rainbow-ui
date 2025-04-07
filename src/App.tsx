import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, fas } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Alert from './components/Alert/alert';
import AlertDemo from './components/Alert/demo';
import Button from './components/Button/button';
import Divider from './components/Divider/divider';
import Form from './components/Form/form';
import Item from './components/Form/formItem';
import Icon from './components/Icon';
import Image from './components/Image';
import Input from './components/Input';
import Loading from './components/Loading';
import Menu from './components/Menu';
import PaginatorExample from './components/Paginator/paginator.example';
import Select from './components/Select';
import Transition from './components/Transition/transition';
import Upload, { UploadFile } from './components/Upload';
import './components/Upload/upload.scss';
library.add(fas, faEye)

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

  // 图片数据
  const imageUrls = [
    'https://images.unsplash.com/photo-1605460375648-278bcbd579a6',
    'https://images.unsplash.com/photo-1573455494060-c5595004fb6c',
    'https://picsum.photos/600/350',
    'https://picsum.photos/2000/1500',
    'https://picsum.photos/4000/3000',
    'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
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

  // 添加Loading组件的状态
  const [loading, setLoading] = useState(false);
  const [fullscreenLoading, setFullscreenLoading] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);

  // 模拟异步请求函数
  const simulateRequest = (duration = 2000) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  };

  // 处理基础加载
  const handleBasicLoading = async () => {
    setLoading(true);
    await simulateRequest();
    setLoading(false);
  };

  // 处理全屏加载
  const handleFullscreenLoading = async () => {
    setFullscreenLoading(true);
    await simulateRequest(3000);
    setFullscreenLoading(false);
  };

  // 处理内容区域加载
  const handleContentLoading = async () => {
    setContentLoading(true);
    await simulateRequest(2500);
    setContentLoading(false);
  };

  return (
    <div className="App">
      <div className='header'>
        <h2>Rainbow UI 组件库展示</h2>
        <p style={{ color: 'white', opacity: 0.9, marginTop: '10px', zIndex: 2, textAlign: 'center' }}>
          一个拥有15 + 组件的 React 组件库，颜值与实用兼备，持续拓展中...
        </p>
      </div>

      <hr className="rainbow-divider" />

      <div className='content'>
        {/* 左侧栏组件 */}
        <div className='left'>
          {/* 按钮组件框 */}
          <div className='component'>
            <div className='component-title'>按钮组件</div>
            <div className='component-content'>
              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>基础按钮</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <Button>默认按钮</Button>
                  <Button className="custom" autoFocus>自动聚焦</Button>
                  <Button onClick={() => alert('clicked')}>点击事件</Button>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>按钮尺寸</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  <Button size={Button.Size.Small}>小号按钮</Button>
                  <Button>默认尺寸</Button>
                  <Button size={Button.Size.Large}>大号按钮</Button>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>按钮类型</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <Button btnType={Button.Type.Primary}>主要按钮</Button>
                  <Button btnType={Button.Type.Warning}>警告按钮</Button>
                  <Button btnType={Button.Type.Danger}>危险按钮</Button>
                  <Button disabled>禁用按钮</Button>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>链接按钮</h4>
                <Button btnType={Button.Type.Link} href="https://www.baidu.com" target="_blank">链接按钮</Button>
              </div>
            </div>
          </div>

          {/* 图标组件框 */}
          <div className='component'>
            <div className='component-title'>图标组件</div>
            <div className='component-content'>
              <div>
                <h4 style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#666' }}>基础图标</h4>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '15px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Icon icon="coffee" size='3x' />
                    <span style={{ marginTop: '5px', fontSize: '12px' }}>coffee</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Icon icon="arrow-down" theme={Icon.Theme.Primary} size='3x' />
                    <span style={{ marginTop: '5px', fontSize: '12px' }}>arrow-down</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Icon icon="arrow-up" theme={Icon.Theme.Warning} size='3x' />
                    <span style={{ marginTop: '5px', fontSize: '12px' }}>arrow-up</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Icon icon="check" theme={Icon.Theme.Success} size='3x' />
                    <span style={{ marginTop: '5px', fontSize: '12px' }}>check</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Icon icon="times" theme={Icon.Theme.Danger} size='3x' />
                    <span style={{ marginTop: '5px', fontSize: '12px' }}>times</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alert组件框 */}
          <div className='component'>
            <div className='component-title'>Alert组件</div>
            <div className='component-content'>
              <AlertDemo />
              <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <Button btnType={Button.Type.Primary} onClick={() => setShowBasicAlert(true)}>
                  显示基础 Alert
                </Button>
                {showBasicAlert && (
                  <Alert
                    title="这是一个直接使用的 Alert"
                    description="在任何组件中，你都可以通过这种方式使用 Alert 组件"
                    type={Alert.Type.Success}
                    onClose={() => setShowBasicAlert(false)}
                  />
                )}
              </div>
            </div>
          </div>

          {/* 分割线组件框 */}
          <div className='component'>
            <div className='component-title'>分割线组件</div>
            <div className='component-content'>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>默认水平分割线</p>
                  <Divider />
                </div>

                <div>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>带文字的分割线</p>
                  <Divider>文字内容</Divider>
                </div>

                <div>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>分割线位置</p>
                  <Divider textAlign={Divider.TextAlign.Left}>左侧</Divider>
                  <Divider textAlign={Divider.TextAlign.Right}>右侧</Divider>
                </div>

                <div>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>垂直分割线</p>
                  <div style={{ height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span>左侧内容</span>
                    <Divider direction={Divider.Direction.Vertical} />
                    <span>右侧内容</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 中间栏组件 */}
        <div className='middle'>
          {/* 菜单组件框 */}
          <div className='component'>
            <div className='component-title'>菜单组件</div>
            <div className='component-content'>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>水平菜单</h4>
                <div className="menu-component">
                  <Menu defaultIndex={0} onSelect={(index) => { console.log(index) }}>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>产品</Menu.Item>
                    <Menu.Item>关于我们</Menu.Item>
                    <Menu.Item disabled>联系我们</Menu.Item>
                    <Menu.SubMenu title="下拉菜单">
                      <Menu.Item>产品1</Menu.Item>
                      <Menu.Item>产品2</Menu.Item>
                      <Menu.Item>产品3</Menu.Item>
                    </Menu.SubMenu>
                  </Menu>
                </div>
              </div>

              <div>
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>垂直菜单</h4>
                <div className="menu-component">
                  <Menu mode={Menu.Mode.Vertical} defaultIndex={0} onSelect={(index) => { console.log(index) }}>
                    <Menu.Item>首页</Menu.Item>
                    <Menu.Item>产品</Menu.Item>
                    <Menu.Item>关于我们</Menu.Item>
                    <Menu.SubMenu title="下拉菜单">
                      <Menu.Item>产品4</Menu.Item>
                      <Menu.Item>产品5</Menu.Item>
                      <Menu.Item>产品6</Menu.Item>
                    </Menu.SubMenu>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          {/* 输入框组件框 */}
          <div className='component'>
            <div className='component-title'>输入框组件</div>
            <div className='component-content'>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>基础输入框</p>
                  <Input placeholder="默认输入框" />
                </div>

                <div>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>不同尺寸</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Input size={Input.Size.Large} placeholder="大尺寸输入框" />
                    <Input placeholder="默认尺寸" />
                    <Input size={Input.Size.Small} placeholder="小尺寸输入框" />
                  </div>
                </div>

                <div>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>带图标的输入框</p>
                  <Input icon="coffee" placeholder="带图标的输入框" />
                </div>

                <div>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>前后缀</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Input prepend="https://" placeholder="域名" />
                    <Input append=".com" placeholder="域名" />
                    <Input prepend="https://" append=".com" placeholder="完整网址" />
                  </div>
                </div>

                <div>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>密码输入框</p>
                  <Input type="password" icon={faEye} placeholder="密码输入框" />
                </div>
              </div>
            </div>
          </div>

          {/* 选择器组件框 */}
          <div className='component'>
            <div className='component-title'>选择器组件</div>
            <div className='component-content'>
              <div style={{ maxWidth: '100%' }}>
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>基础选择器</p>
                  <Select
                    options={selectOptions}
                    placeholder="请点击选择"
                    onChange={(value, option) => console.log('选择值:', value, option)}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>尺寸变体</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <Select
                      options={selectOptions}
                      placeholder="小尺寸选择器"
                      size='small'
                    />
                    <Select
                      options={selectOptions}
                      placeholder="默认尺寸选择器"
                    />
                    <Select
                      options={selectOptions}
                      placeholder="大尺寸选择器"
                      size='large'
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>禁用状态</p>
                  <Select
                    options={selectOptions}
                    placeholder="禁用状态的选择器"
                    disabled
                  />
                </div>

                <div>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>多选选择器</p>
                  <Select
                    mode={Select.Mode.Multiple}
                    options={selectOptions}
                    defaultValue={['option1', 'option3']}
                    onChange={(values, selectedOptions) => console.log('多选值变化:', values, selectedOptions)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 分页器组件框 */}
          <div className='component'>
            <div className='component-title'>分页器组件</div>
            <div className='component-content'>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <p style={{ marginBottom: '8px', fontSize: '0.9rem', color: '#666' }}>分页器示例</p>
                  <PaginatorExample />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧栏组件 */}
        <div className='right'>
          {/* 过渡动画组件框 */}
          <div className='component'>
            <div className='component-title'>过渡动画组件</div>
            <div className='component-content'>
              <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <Button btnType={Button.Type.Primary} onClick={() => setShow(!show)}>
                  {show ? '隐藏内容' : '显示内容'}
                </Button>
              </div>

              <Transition in={show} timeout={300} animation="zoom-in-top">
                <div style={{
                  padding: '15px',
                  border: '1px solid #eee',
                  borderRadius: '6px',
                  background: 'linear-gradient(to right, rgba(255,89,94,0.05), rgba(106,76,147,0.05))'
                }}>
                  <h4 style={{ color: '#1982c4', textAlign: 'center', marginBottom: '10px' }}>动画效果展示</h4>
                  <p style={{ textAlign: 'center', margin: '5px 0' }}>这是使用Transition组件包裹的内容</p>
                  <p style={{ textAlign: 'center', margin: '5px 0' }}>点击按钮可以控制显示和隐藏</p>
                </div>
              </Transition>
            </div>
          </div>

          {/* 加载组件框 */}
          <div className='component'>
            <div className='component-title'>加载组件</div>
            <div className='component-content'>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>基础加载</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <Button btnType={Button.Type.Primary} onClick={handleBasicLoading}>
                    显示加载
                  </Button>
                  <div style={{ minWidth: '120px' }}>
                    <Loading isLoading={loading} text="加载中..." />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>全屏加载</h4>
                <Button btnType={Button.Type.Primary} onClick={handleFullscreenLoading}>
                  显示全屏加载 (3秒)
                </Button>
              </div>

              <div>
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>自定义彩虹球数量</h4>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  background: 'rgba(0,0,0,0.02)',
                  padding: '15px',
                  borderRadius: '6px'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '10px', fontSize: '0.9rem' }}>4个</p>
                    <Loading ballCount={4} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: '10px', fontSize: '0.9rem' }}>8个</p>
                    <Loading />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 上传组件框 */}
          <div className='component'>
            <div className='component-title'>上传组件</div>
            <div className='component-content'>
              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>基本上传功能</h4>
                <Upload
                  action="https://run.mocky.io/v3/14d6ced0-58d1-4498-ac1a-9c83f4b2b4fc"
                  onChange={file => console.log('文件状态变化:', file.name)}
                  onRemove={handleRemove}
                  name="file"
                  accept=".jpg,.jpeg,.png,.gif"
                />
              </div>

              <div>
                <h4 style={{ marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>拖拽上传</h4>
                <Upload
                  action="https://run.mocky.io/v3/14d6ced0-58d1-4498-ac1a-9c83f4b2b4fc"
                  onChange={file => console.log('文件状态变化:', file.name)}
                  onRemove={handleRemove}
                  name="file"
                  drag
                >
                  <div className="upload-area">
                    <Icon icon="upload" size="2x" theme={Icon.Theme.Secondary} />
                    <p style={{ margin: '10px 0', color: '#666' }}>拖拽文件到这里上传</p>
                    <p style={{ fontSize: '0.8rem', color: '#999' }}>或点击此区域选择文件</p>
                  </div>
                </Upload>
              </div>
            </div>
          </div>

          {/* 图片组件框 */}
          <div className='component'>
            <div className='component-title'>图片组件</div>
            <div className='component-content'>
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#666' }}>基本图片</h4>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '15px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <Image
                      src={imageUrls[0]}
                      alt="普通图片"
                      width={150}
                      height={100}
                      borderRadius="4px"
                    />
                    <p style={{ fontSize: '0.8rem', marginTop: '5px', color: '#666' }}>普通图片</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Image
                      src={imageUrls[1]}
                      alt="图片适配方式"
                      width={150}
                      height={100}
                      objectFit={Image.ObjectFit.Contain}
                      borderRadius="4px"
                    />
                    <p style={{ fontSize: '0.8rem', marginTop: '5px', color: '#666' }}>适配容器</p>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#666' }}>懒加载图片</h4>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '15px' }}>
                  {imageUrls.slice(2, 5).map((url, index) => (
                    <div key={index} style={{ textAlign: 'center' }}>
                      <Image
                        src={url}
                        alt={`懒加载图片${index + 1}`}
                        lazy={true}
                        width={120}
                        height={80}
                        borderRadius="4px"
                      />
                      <p style={{ fontSize: '0.8rem', marginTop: '5px', color: '#666' }}>懒加载图片{index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#666' }}>图片组预览</h4>
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  {imageUrls.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`预览图片${index + 1}`}
                      width={90}
                      height={65}
                      borderRadius="4px"
                      preview={true}
                      style={{ cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
                      previewGroup={{
                        images: imageUrls,
                        current: index
                      }}
                    />
                  ))}
                </div>
                <p style={{ fontSize: '0.8rem', textAlign: 'center', marginTop: '8px', color: '#666' }}>
                  点击任意图片查看大图预览
                </p>
              </div>

              <div>
                <h4 style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#666' }}>自定义错误图片</h4>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ textAlign: 'center', width: '200px' }}>
                    <Image
                      src="https://non-existing-image.jpg"
                      alt="错误图片"
                      width={180}
                      height={120}
                      borderRadius="4px"
                      fallback={
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '100%',
                          background: 'rgba(0,0,0,0.03)',
                          borderRadius: '4px',
                          padding: '20px'
                        }}>
                          <Icon icon="exclamation-triangle" theme={Icon.Theme.Warning} size="2x" />
                          <span style={{ marginTop: '10px', fontSize: '12px' }}>图片加载失败</span>
                        </div>
                      }
                    />
                    <p style={{ fontSize: '0.8rem', marginTop: '5px', color: '#666' }}>自定义错误显示</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 表单组件框 */}
          <div className='component'>
            <div className='component-title'>表单组件</div>
            <div className='component-content'>
              <div style={{
                maxWidth: '400px',
                margin: '0 auto',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                background: 'linear-gradient(to bottom right, rgba(255,255,255,1), rgba(248,248,252,1))'
              }}>
                <h4 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>用户登录</h4>
                <Form
                  onFinish={(values) => {
                    console.log('表单提交成功:', values);
                    alert('表单提交成功: ' + JSON.stringify(values));
                  }}
                  onFinishFailed={(values, errors) => {
                    console.log('表单提交失败:', values, errors);
                    alert('表单验证失败');
                  }}
                >
                  <Item
                    label='用户名'
                    name='username'
                    rules={[{ required: true, message: '请输入用户名' }]}
                  >
                    <Input placeholder="请输入用户名" icon="user" />
                  </Item>
                  <Item
                    label='密码'
                    name='password'
                    rules={[{ required: true, message: '请输入密码' }, { min: 8, message: '密码长度至少8位' }]}
                  >
                    <Input type="password" placeholder="请输入密码" icon="lock" />
                  </Item>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input type="checkbox" id="remember" style={{ marginRight: '5px' }} />
                      <label htmlFor="remember" style={{ fontSize: '0.85rem', color: '#666' }}>记住我</label>
                    </div>
                    <a href="#" style={{ fontSize: '0.85rem', color: '#1982c4', textDecoration: 'none' }}>忘记密码?</a>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <Button type="submit" btnType={Button.Type.Primary} style={{ width: '100%' }}>登录</Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Loading isLoading={fullscreenLoading} fullscreen={true} withMask={true} text="数据加载中，请稍候..." />

      {/* 页脚 */}
      <div className="footer">
        <hr className="rainbow-divider" />
        <div className="footer-content">
          <div className="footer-logo">
            <h3 style={{ color: 'white', margin: 0 }}>Rainbow UI</h3>
            <p style={{ margin: '5px 0 0', opacity: 0.8, fontSize: '0.9rem' }}>美丽、实用的 React 组件库🌈</p>
          </div>
          <div className="footer-links">
            <div className="footer-links-group">
              <h4>Rainbow-UI网站</h4>
              <a href="https://rainbow-ui-one.vercel.app/" target="_blank" rel="noreferrer">首页[当前]</a>
              <a href="https://rainbow-ui-storybook.vercel.app/" target="_blank" rel="noreferrer">组件文档</a>
              <a href="https://github.com/zihao17/rainbow-ui" target="_blank" rel="noreferrer">github仓库</a>
            </div>
            <div className="footer-links-group">
              <h4>社区</h4>
              <a href="https://github.com/zihao17/rainbow-ui" target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <div className="footer-links-group">
              <h4>更多</h4>
              <a href="https://github.com/zihao17/rainbow-ui" target="_blank" rel="noreferrer">联系我</a>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Rainbow UI. by pzh 保留所有权利</p>
          <div className="social-links">
            <a href="#"><Icon icon="github" /></a>
            <a href="#"><Icon icon="twitter" /></a>
            <a href="#"><Icon icon="medium" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}

// 表单实例方法示例
const FormWithMethods = () => {
  // 创建表单引用
  const formRef = useRef<any>(null);

  // 重置表单
  const handleReset = () => {
    formRef.current?.resetFields();
  };

  // 填充表单
  const handleFill = () => {
    formRef.current?.setFieldsValue({
      username: '测试用户',
      email: 'test@example.com'
    });
  };

  // 验证表单
  const handleValidate = () => {
    formRef.current?.validateAllFields()
      .then((result: any) => {
        console.log('验证成功:', result);
        alert('验证成功: ' + JSON.stringify(result.values));
      })
      .catch((error: any) => {
        console.log('验证失败:', error);
      });
  };

  return (
    <Form ref={formRef}>
      <Item
        label='用户名'
        name='username'
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Item>
      <Item
        label='邮箱'
        name='email'
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </Item>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button onClick={handleValidate} btnType={Button.Type.Primary} style={{ marginRight: '8px' }}>验证</Button>
        <Button onClick={handleFill} btnType={Button.Type.Default} style={{ marginRight: '8px' }}>填充</Button>
        <Button onClick={handleReset} btnType={Button.Type.Danger}>重置</Button>
      </div>
    </Form>
  );
};

// 复杂注册表单示例
const RegistrationForm = () => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <Form
      initialValues={{
        gender: '男',
        address: {
          city: '北京'
        }
      }}
      onFinish={(values) => {
        if (!agreedToTerms) {
          alert('请先同意用户协议');
          return;
        }
        console.log('注册信息:', values);
        alert('注册成功: ' + JSON.stringify(values));
      }}
    >
      <Item
        label='用户名'
        name='username'
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Item>
      <Item
        label='邮箱'
        name='email'
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </Item>
      <Item
        label='密码'
        name='password'
        rules={[
          { required: true, message: '请输入密码' },
          { min: 8, message: '密码长度至少8位' }
        ]}
      >
        <Input type="password" placeholder="请输入密码" />
      </Item>
      <Item
        label='确认密码'
        name='confirmPassword'
        rules={[
          { required: true, message: '请确认密码' }
        ]}
      >
        <Input type="password" placeholder="请确认密码" />
      </Item>
      <Item
        label='性别'
        name='gender'
      >
        <Select
          options={[
            { value: '男', label: '男' },
            { value: '女', label: '女' },
            { value: '其他', label: '其他' }
          ]}
        />
      </Item>
      <Item
        label='城市'
        name='address.city'
      >
        <Select
          options={[
            { value: '北京', label: '北京' },
            { value: '上海', label: '上海' },
            { value: '广州', label: '广州' },
            { value: '深圳', label: '深圳' }
          ]}
        />
      </Item>
      <Item name='terms'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            id="terms"
            checked={agreedToTerms}
            onChange={e => setAgreedToTerms(e.target.checked)}
          />
          <label htmlFor="terms" style={{ marginLeft: '8px' }}>
            我已阅读并同意用户协议
          </label>
        </div>
      </Item>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="submit" btnType={Button.Type.Primary}>注册</Button>
      </div>
    </Form>
  );
};

export default App;
