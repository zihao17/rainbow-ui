import React, { useState } from 'react';
import Button from '../Button';
import Alert from './alert';

/**
 * Alert 演示组件
 * 用于展示 Alert 组件的各种用法
 */
const AlertDemo: React.FC = () => {
    const [showDefaultAlert, setShowDefaultAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showDangerAlert, setShowDangerAlert] = useState(false);
    const [showWarningAlert, setShowWarningAlert] = useState(false);
    const [showLongAlert, setShowLongAlert] = useState(false);

    return (
        <div className="alert-demo">
            <h2>提示组件</h2>

            <div className="demo-buttons">
                <Button onClick={() => setShowDefaultAlert(true)} btnType={Button.Type.Default}>
                    默认
                </Button>

                <Button onClick={() => setShowSuccessAlert(true)} btnType={Button.Type.Primary}>
                    成功
                </Button>

                <Button onClick={() => setShowDangerAlert(true)} btnType={Button.Type.Danger}>
                    危险
                </Button>

                <Button onClick={() => setShowWarningAlert(true)} btnType={Button.Type.Warning}>
                    警告
                </Button>

                <Button onClick={() => setShowLongAlert(true)}>
                    长时间
                </Button>
            </div>

            {showDefaultAlert && (
                <Alert
                    title="默认提示"
                    description="这是一个默认提示，3秒后自动关闭"
                    type={Alert.Type.Default}
                    onClose={() => setShowDefaultAlert(false)}
                />
            )}

            {showSuccessAlert && (
                <Alert
                    title="成功提示"
                    description="操作已成功完成，3秒后自动关闭"
                    type={Alert.Type.Success}
                    onClose={() => setShowSuccessAlert(false)}
                />
            )}

            {showDangerAlert && (
                <Alert
                    title="错误提示"
                    description="操作失败，请重试。3秒后自动关闭"
                    type={Alert.Type.Danger}
                    onClose={() => setShowDangerAlert(false)}
                />
            )}

            {showWarningAlert && (
                <Alert
                    title="警告提示"
                    description="请注意，此操作可能有风险。3秒后自动关闭"
                    type={Alert.Type.Warning}
                    onClose={() => setShowWarningAlert(false)}
                />
            )}

            {showLongAlert && (
                <Alert
                    title="长时间提示"
                    description="这个提示将持续10秒后自动关闭"
                    type={Alert.Type.Success}
                    duration={10000}
                    onClose={() => setShowLongAlert(false)}
                />
            )}
        </div>
    );
};

export default AlertDemo;