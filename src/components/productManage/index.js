import React from "react";
import { withRouter, Link } from "react-router-dom";
import ContentTitle from "../contentTitle";
import axios from "axios";
import { Table, message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "./index.scss";
import ProductSearch from "../productSearch";



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
            // 查询类型
            selectValue: "productId",
            // 查询的关键词
            keyWord: ""
        };

    }

    // 生命周期：组件加载完成
    componentDidMount() {
        this.inintData();
    }

    /** 
     * 分页的页数发生变化时，获取对应的用户数据
     * @param     pagination 是antd组件封装好的参数，里面有current, pageSize total等参数
    */
    handleTableChange = (pagination) => {
        // 做判断，如果搜索框里有关键词的话，就按照搜索的数据翻页，没有关键词的话，按照全部的数据翻页
        let requestUrl = null,
            requestParams = null;
        if (this.state.keyWord) {
            requestUrl = "/manage/product/search.do";
            requestParams = {
                [this.state.selectValue]: this.state.keyWord,
                pageSize: pagination.pageSize,
                pageNum: pagination.current
            }
        } else {
            requestUrl = "/manage/product/list.do";
            requestParams = {
                pageSize: pagination.pageSize,
                pageNum: pagination.current
            }
        }

        axios({
            method: "get",
            url: requestUrl,
            params: requestParams
        }).then(res => {
            // 请求成功后数据赋值
            if (res.data.status === 0) {
                this.setState({
                    data: res.data.data.list,
                    loading: false,
                    pagination: Object.assign(this.state.pagination, pagination, { total: res.data.data.total })
                })
            } else {
                message.warning(res.data.msg);
            }
        }).catch(err => {
            console.log(err);
        })
    };


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
                    pagination: Object.assign({}, this.state.pagination, { total: res.data.data.total }),
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
                if (res.data.status === 0) {
                    message.success(res.data.data);
                    // 重新获取一下数据
                    this.handleTableChange(this.state.pagination);
                } else {
                    message.error(res.data.data);
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }

    /** 
     * 搜索组件提交搜索框内容，过滤查找一下
     * 更新一下state
    */
    searchChange(value) {
        this.setState({
            selectValue: value.selectValue,
            keyWord: value.keyWord
        }, () => {
            if (value.keyWord === "") {
                this.handleTableChange(this.state.pagination);
            } else {
                axios({
                    method: "get",
                    url: "/manage/product/search.do",
                    params: {
                        [value.selectValue]: value.keyWord
                    }
                }).then(res => {
                    if (res.data.status === 0) {
                        this.setState({
                            data: res.data.data.list,
                            pagination: Object.assign({}, this.state.pagination, { current: 1, total: res.data.data.total })
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        })


    }

    // 点击详情按钮跳转到对应商品的详情页面
    jumpProductDetail(data) {
        this.props.history.push({ pathname: '/product/detail', state: { id: data.id } });
    }

    // 点击编辑按钮跳转到对应的商品编辑页面
    jumpProductEdit(data) {
        this.props.history.push({ pathname: '/product/edit', state: { id: data.id } });
    }

    render() {
        // 表头
        const columns = [
            {
                title: '商品ID',
                dataIndex: 'id',
                // width: '4rem',
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
                render: (data, record) => <span className="optionWrap">
                    <a className="option" onClick={() => this.jumpProductDetail(record)}>详情</a>
                    <a className="option" onClick={() => this.jumpProductEdit(record)}>编辑</a>
                </span>
            }
        ];

        const { data, pagination, loading } = this.state;
        return (
            <div className="productManage">
                <ContentTitle title="商品列表" />
                {/* 新增商品按钮 */}
                <div className="addProduct">
                    <Link to="/product/edit">
                        <Button type="primary" shape="round" icon={<PlusOutlined />}  >
                            添加商品
                        </Button>
                    </Link>
                </div>
                <ProductSearch onChange={(value) => this.searchChange(value)} />
                {/* 表格 */}
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