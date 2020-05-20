import React from "react";
import { withRouter } from "react-router-dom";
import ContentTitle from "../contentTitle";
import axios from "axios";
import { Table, message } from 'antd';
import "./index.scss";



class ProductManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 商品数据
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
        this.initProductCount();
        this.inintData();
    }

    /** 
     * 分页的页数发生变化时，获取对应的用户数据
     * @param     pagination 是antd组件封装好的参数，里面有current, pageSize total等参数
    */
    handleTableChange = (pagination) => {
        axios({
            method: "get",
            url: "/manage/product/list.do",
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

    // 初始化商品总数
    initProductCount() {
        axios.get("/manage/statistic/base_count.do").then(res => {
            if (res.data.status === 0) {
                this.setState({
                    pagination: Object.assign({}, this.state.pagination, { total: res.data.data.productCount })
                })
            }
        }).catch(err => {
            console.log(err);
        });
    }

    // 初始化商品数据
    inintData = () => {
        this.setState({ loading: true });
        axios({
            method: "get",
            url: "/manage/product/list.do"
        }).then(res => {
            // 请求成功后数据赋值
            if (res.data.status === 0) {
                this.setState({
                    data: res.data.data.list,
                    loading: false
                })
            }
        }).catch(err => {
            console.log(err);
        })

    };

    // 改变商品的状态,第一个参数是整行数据，第二个参数是想要变成的状态
    changeStatus(record, wantStatus) {
        if (record.status !== wantStatus) {
            axios({
                method: "get",
                url: "/manage/product/set_sale_status.do",
                params: {
                    productId: record.id,
                    status: wantStatus
                }
            }).then(res => {
                if(res.data.status === 0) {
                    message.success(res.data.data);
                    // 重新获取一下数据
                    this.handleTableChange(this.state.pagination);
                }else {
                    message.error(res.data.data);
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    render() {
        // 表头
        const columns = [
            {
                title: '商品ID',
                dataIndex: 'id',
                // width: '20%',
            },
            {
                title: '商品信息',
                dataIndex: 'name',
                // width: '20%',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: data => "￥" + data
            },
            {
                title: '状态',
                dataIndex: 'status',
                width: '10%',
                render: (data, record) => {
                    return (<span className="statusWrap">
                        <a
                            className={`status ${data === 1 ? "active" : ""}`}
                            onClick={() => this.changeStatus(record, 1)}
                        >在售</a>
                        <a
                            className={`status ${data === 2 ? "active" : ""}`}
                            onClick={() => this.changeStatus(record, 2)}
                        >下架</a>
                    </span>)
                }
            },
            {
                title: '操作',
                width: '10%',
                // dataIndex: 'phone',
                render: () => <span className="optionWrap"><a className="option">详情</a><a className="option">编辑</a></span>
            }
        ];

        const { data, pagination, loading } = this.state;
        return (
            <div className="productManage">
                <ContentTitle title="商品列表" />
                <Table
                    style={{ overflow: "auto" }}
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
export default withRouter(ProductManage)