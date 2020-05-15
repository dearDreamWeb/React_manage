import React from 'react';
import "./index.scss";
import NavTop from "../../components/navTop/index";  // 头部导航
import NavSide from "../../components/navSide/index";  // 头部导航

import { Layout, Breadcrumb } from 'antd';
const { Content } = Layout;
class Home extends React.Component {
    render() {
        return (<div className="home">
            <Layout>
                <NavTop></NavTop>
                <Layout className="main" style={{ height: "calc(100vh - 64px)" }}>
                    <NavSide></NavSide>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            Content
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>)
    }
}

export default Home;