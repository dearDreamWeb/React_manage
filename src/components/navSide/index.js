import React from "react";
import { NavLink } from "react-router-dom";
import "./index.scss";
import { Layout, Menu } from 'antd';
import { HomeOutlined, ApartmentOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Sider } = Layout;
class NavSide extends React.Component {
    constructor() {
        super();
        this.state = {
            // 左侧列表数据
            subMenuList: [
                {
                    title: "商品",
                    key: "sub1",
                    activeRouter: "/product",
                    icon: <ApartmentOutlined />,
                    items: [
                        { key: "1", activeRouter: "/product/manage", title: "商品管理" },
                        { key: "2", activeRouter: "/product/categories", title: "分类管理" }
                    ]
                },
                {
                    title: "订单",
                    key: "sub2",
                    icon: <UnorderedListOutlined />,
                    activeRouter: "/order",
                    items: [
                        { key: "3", activeRouter: "/order/manage", title: "订单管理" }
                    ]
                },
                {
                    title: "用户",
                    key: "sub3",
                    icon: <UserOutlined />,
                    activeRouter: "/users",
                    items: [
                        { key: "4", activeRouter: "/users/manage", title: "用户管理" }
                    ]
                }
            ]
        }
    }
    changeRouter() {
        this.props.history.push('/child02')
    }
    render() {
        return (
            <div className="navSide">
                <Sider width={300} className="site-layout-background">
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['0']}
                        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                    >
                        <Menu.Item key="0" icon={<HomeOutlined />} >首页</Menu.Item>
                        {/* 遍历列表数据 */}
                        {this.state.subMenuList.map(item => {
                            return (
                                <SubMenu
                                    key={item.key}
                                    icon={item.icon}
                                    title={item.title}
                                >
                                    {item.items.map(item1 => {
                                        return (
                                            <Menu.Item
                                                key={item1.key}
                                            >
                                                <NavLink to={item1.activeRouter}>
                                                    {item1.title}
                                                </NavLink>
                                            </Menu.Item>)
                                    })}
                                </SubMenu>)
                        })}
                        {/* <SubMenu key="sub1" icon={<ApartmentOutlined />} title="商品">
                            <Menu.Item key="2">商品管理</Menu.Item>
                            <Menu.Item key="3">分类管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<UnorderedListOutlined />} title="订单">
                            <Menu.Item key="9">订单管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<UserOutlined />} title="用户">
                            <Menu.Item key="10">用户管理</Menu.Item>
                        </SubMenu> */}
                    </Menu>
                </Sider>
            </div>
        )
    }
}
export default NavSide;