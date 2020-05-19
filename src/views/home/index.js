import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.scss";
import NavTop from "../../components/navTop/index";  // 头部导航
import NavSide from "../../components/navSide/index";  // 侧边导航
import Main from "../../components/main/index";  // 内容区首页
import UsersList from "../../components/userList/index";  // 用户列表

import { Layout } from 'antd';
// const { Content } = Layout;
class Home extends React.Component {
    render() {
        return (<div className="home">
            <Layout>
                <NavTop></NavTop>
                <Layout className="main" style={{ height: "calc(100vh - 64px)" }}>
                    <NavSide></NavSide>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/" component={ Main } />
                                <Route  path="/users/list" component={ UsersList } />
                            </Switch>
                        </BrowserRouter>
                        {/* <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            Content
                        </Content> */}
                    </Layout>
                </Layout>
            </Layout>
        </div>)
    }
}

export default Home;