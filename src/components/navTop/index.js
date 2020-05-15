import React from "react";
import { Layout, Menu, Dropdown } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import "./index.scss";

const { Header } = Layout;
const menu = (
    <Menu>
        <Menu.Item>
            <a rel="noopener noreferrer" href="#">退出登录</a>
        </Menu.Item>
    </Menu>
);
class NavTop extends React.Component {
    render() {
        return (<div className="navTop">
            <Header className="header">
                <div className="logo">
                    <img src={require("./../../images/logo.png")} alt="logo" height="64px" />
                </div>
                <Dropdown overlay={menu} trigger={['click']} className="dropDown">
                    <a href="" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <UserOutlined /> 欢迎，admin <DownOutlined />
                    </a>
                </Dropdown>
            </Header>
        </div>)
    }
}
export default NavTop