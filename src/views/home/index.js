import React from 'react';
import { Route, Switch } from "react-router-dom";
import "./index.scss";
import NavTop from "../../components/navTop/index";  // 头部导航
import NavSide from "../../components/navSide/index";  // 侧边导航
import Main from "../../components/main/index";  // 内容区首页
import UsersList from "../../components/userList/index";  // 用户列表
import NotFound from "../../views/notFound";  // 404页面

import { Layout } from 'antd';
// const { Content } = Layout;
class Home extends React.Component {
    render() {
        return (<div className="home">
            <Layout>
                <NavTop></NavTop>
                <Layout className="main" >
                    <NavSide></NavSide>
                    <Layout className="content_layout">
                        <Switch>
                            <Route exact path="/" component={Main} />
                            <Route path="/product/manage" component={Main}></Route>
                            <Route path="/product/categories" component={Main}></Route>
                            <Route path="/order/manage" component={Main}></Route>
                            <Route path="/users/manage" component={UsersList} />
                            <Route component={NotFound}></Route>
                        </Switch>
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