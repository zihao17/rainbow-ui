import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
import './App.css';
import Button, { ButtonType, ButtonSize } from './components/Button/button';
import AlertDemo from './components/Alert/demo';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';
import Transition from './components/Transition/transition';

function App() {
  // 添加一个状态来控制直接使用的Alert显示
  const [showBasicAlert, setShowBasicAlert] = useState(false);
  const [show, setShow] = useState(false);

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
          <h3>动画</h3>
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

      <hr />
      <p>END</p>
    </div>
  );
}

export default App;
