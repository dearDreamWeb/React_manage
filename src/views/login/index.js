import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, message } from 'antd';
import "./index.scss";
import RSA from "../../rsa/index";  //RSA加密

const layout = {
    // label的宽度
    labelCol: { span: 4 },
    // 输入框的宽度
    // wrapperCol: { span: 16 } 
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
};

const Login = (props) => {
    // 通过remember是否为true来决定是否在输入框中输入值
    const [userInfo, setUserInfo] = useState(() => {
        // 获取localStorage存储的加密过的用户信息
        let localUserInfo = window.localStorage.getItem("userInfo");
        // 解密并JSON.parse()用户信息
        let decryptLocalUserInfo = JSON.parse(RSA.decrypt(localUserInfo));
        if (decryptLocalUserInfo && decryptLocalUserInfo.remember) {
            return decryptLocalUserInfo;
        }
    });

    // 输入框无误
    const onFinish = values => {
        // 使用RSA加密
        window.localStorage.setItem("userInfo", RSA.encrypt(JSON.stringify(values)));
        window.localStorage.setItem("isLogin", true);
        message.success("登录成功");
        props.history.push("/");
    };

    // 输入框有错误
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login">
            <Row className="form_wrap" onClick={() => setUserInfo({ username: "1", password: "1", remember: true })}>
                <Col sm={8}>
                    <Form
                        className="form"
                        {...layout}
                        name="basic"
                        initialValues={userInfo}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input placeholder="请输入用户名" />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password placeholder="请输入密码" autoComplete="off" />
                        </Form.Item>

                        <Form.Item className="remember" {...tailLayout} name="remember" valuePropName="checked">
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>

                        <Form.Item className="btn" {...tailLayout}>
                            <Button type="primary" htmlType="submit" size="large" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>

        </div>
    );
};

export default Login;
