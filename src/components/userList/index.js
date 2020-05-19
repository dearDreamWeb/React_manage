import React from "react";
import ContentTitle from "../contentTitle";
import "./index.scss";
import axios from "axios";
import { Table, message } from 'antd';


const columns = [
    {
        title: 'ID',
        // dataIndex: 'name',
        render: name => `${name.first} ${name.last}`,
        // width: '20%',
    },
    {
        title: '用户名',
        // dataIndex: 'gender',
        // filters: [
        //     { text: 'Male', value: 'male' },
        //     { text: 'Female', value: 'female' },
        // ],
        // width: '20%',
    },
    {
        title: '密码',
        // dataIndex: 'email',
    },
    {
        title: '邮箱',
        // dataIndex: 'email',
    },
    {
        title: '手机号',
        // dataIndex: 'email',
    }
];

const getRandomuserParams = params => {
    return {
        results: params.pagination.pageSize,
        page: params.pagination.current,
        ...params,
    };
};

class UsersList extends React.Component {
    state = {
        // 用户数据
        data: [],
        // 当前多少页，每页多少条数据
        pagination: {
            current: 1,
            pageSize: 10,
        },
        // 是否开启加载动画
        loading: false,
    };

    componentDidMount() {
        const { pagination } = this.state;
        this.inintData({ pagination });
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.fetch({
            sortField: sorter.field,
            sortOrder: sorter.order,
            pagination,
            ...filters,
        });
    };

    // 初始化数据
    inintData = (params) => {
        this.setState({ loading: true });
        axios({
            method: "get",
            url: "/manage/user/list.do"
        }).then(res => {
            if(res.data.status === 0) {

            }else {
                message.info(res.data.msg);
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
                    rowKey={record => record.login.uuid}
                    dataSource={data}
                    pagination={pagination}
                    loading={false}
                    onChange={this.handleTableChange}
                    bordered="true"
                />
            </div>
        );
    }
}
export default UsersList