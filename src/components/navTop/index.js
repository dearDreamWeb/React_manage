import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import "./index.scss";
import RSA from "../../rsa";

const { Header } = Layout;




class NavTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: JSON.parse(window.localStorage.getItem("isLogin")),
            userName: null
        }
    }

    // 点击退出登录，清除用户名
    changeLoginState() {
        window.localStorage.setItem("isLogin", false);
        window.location.reload();
    }

    // 初始化用户名
    initUserName() {
        let userInfo = window.localStorage.getItem("userInfo");
        if (userInfo && this.state.isLogin) {
            let decryptUserInfo = JSON.parse(RSA.decrypt(userInfo));
            this.setState({
                userName: decryptUserInfo.username
            })
        }
    }

    componentDidMount() {
        this.initUserName();
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a rel="noopener noreferrer" onClick={() => this.changeLoginState()}>退出登录</a>
                </Menu.Item>
            </Menu>
        );
        return (<div className="navTop">
            <Header className="header">
                <div className="logo">
                    <img src={require("./../../images/logo.png")} alt="logo" height="64px" />
                </div>
                {
                    this.state.userName
                        ? (<Dropdown overlay={menu} trigger={['click']} className="dropDown">
                            <a href="" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <UserOutlined /> 欢迎，{this.state.userName} <DownOutlined />
                            </a>
                        </Dropdown>)
                        : (<Link to="/login" className="loginLink">请登录</Link>)
                }
            </Header>
        </div>)
    }
}
export default NavTop