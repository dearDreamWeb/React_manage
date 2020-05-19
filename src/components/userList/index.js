import React from "react";
import ContentTitle from "../contentTitle";
import "./index.scss";
import axios from "axios";
import { Table, message } from 'antd';

// 表头
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        // width: '20%',
    },
    {
        title: '用户名',
        dataIndex: 'username',
        // width: '20%',
    },
    {
        title: '密码',
        dataIndex: 'password',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
    }
];

// const getRandomuserParams = params => {
//     return {
//         results: params.pagination.pageSize,
//         page: params.pagination.current,
//         ...params,
//     };
// };

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 用户数据
            data: [],
            // 当前多少页，每页多少条数据
            pagination: {
                current: 1,  //当前页数
                pageSize: 10, // 每页多少条数据
                total: 0,     // 获取的数据数量
                showQuickJumper: true
            },
            // 是否开启加载动画
            loading: false,
        };
    }

    // 生命周期：组件加载完成
    componentDidMount() {
        this.initUserCount();
        this.inintData();
    }

    /** 
     * 分页的页数发生变化时，获取对应的用户数据
     * @param     pagination 是antd组件封装好的参数，里面有current, pageSize total等参数
    */
    handleTableChange = (pagination) => {
        console.log(pagination)
        axios({
            method: "get",
            url: "/manage/user/list.do",
            params: {
                pageSize: pagination.pageSize,
                pageNum: pagination.current
            }
        }).then(res => {
            // 请求成功后数据赋值
            if (res.data.status === 0) {
                this.setState({
                    data: res.data.data.list,
                    loading: false,
                    pagination: Object.assign(this.state.pagination, pagination)
                })
            } else {
                message.warning(res.data.msg);
            }
        }).catch(err => {
            console.log(err);
        })
    };

    // 初始化用户总数
    initUserCount() {
        axios.get("/manage/statistic/base_count.do").then(res => {
            if (res.data.status === 0) {
                this.setState({
                    pagination: Object.assign({}, this.state.pagination, { total: res.data.data.userCount })
                })
            }
        }).catch(err => {
            console.log(err);
        });
    }

    // 初始化用户数据
    inintData = () => {
        this.setState({ loading: true });
        axios({
            method: "get",
            url: "/manage/user/list.do"
        }).then(res => {
            // 请求成功后数据赋值
            if (res.data.status === 0) {
                this.setState({
                    data: res.data.data.list,
                    loading: false
                })
            } else {
                message.warning(res.data.msg);
            }
        }).catch(err => {
            console.log(err);
        })

    };

    render() {
        const { data, pagination, loading } = this.state;
        return (
            <div className="usersList">
                <ContentTitle title="用户列表" />
                <Table
                    columns={columns}
                    rowKey={() => Math.random() * 1000000}
                    dataSource={data}           // 用户数据
                    pagination={pagination}     // 分页配置参数
                    loading={loading}           // 是否开启加载
                    onChange={this.handleTableChange}   // 分页改变触发回调函数
                    bordered={true}             // 是否显示边框
                />
            </div>
        );
    }
}
export default UsersList