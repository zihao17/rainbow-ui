import React, { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

// 修正拼写错误
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom'| 'zoom-in-right';

// 正确扩展 CSSTransitionProps 接口
interface TransitionProps {
  animation?: AnimationName;
  classNames?: string;
  children?: React.ReactNode;
  // 将 CSSTransitionProps 的所有属性都包含进来
}

// 使用默认属性
const defaultProps: Partial<TransitionProps & CSSTransitionProps> = {
  unmountOnExit: true,
  appear: true
};

const Transition: React.FC<TransitionProps & CSSTransitionProps> = (props) => {
  // 创建 nodeRef 以解决 findDOMNode 废弃问题
  const nodeRef = useRef(null);

  // 合并默认属性和传入的属性
  const mergedProps = { ...defaultProps, ...props };
  const { children, classNames, animation, ...restProps } = mergedProps;

  return (
    <CSSTransition
      nodeRef={nodeRef}
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<any>, { ref: nodeRef })
        : children}
    </CSSTransition>
  );
};

export default Transition;