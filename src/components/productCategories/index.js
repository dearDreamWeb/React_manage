import React from "react";
import { withRouter, Link } from "react-router-dom";
import ContentTitle from "../contentTitle";
import axios from "axios";
import { Table, message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import "./index.scss";
import ProductSearch from "../productSearch";



class ProductCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 分类的所有数据
            data: [],
            // 当前页面的数据
            currentPageData: [],
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
        this.setState({
            // 当前页码的数据通过页数和每页多少数据来计算
            currentPageData: this.state.data.slice(pagination.pageSize * (pagination.current - 1), (pagination.pageSize * pagination.current - 1)),
            loading: false,
            pagination: Object.assign(this.state.pagination, pagination, { total: this.state.data.length })
        })
    };

    // 初始化商品数据
    inintData = () => {
        this.setState({ loading: true });
        return axios({
            method: "get",
            url: "/manage/category/get_category.do"
        }).then(res => {
            // 请求成功后数据赋值
            if (res.data.status === 0) {
                this.setState({
                    data: res.data.data,
                    loading: false,
                    pagination: Object.assign({}, this.state.pagination, { total: res.data.data.length }),
                    // 当前页面的数据，页数乘以每页多少数据
                    currentPageData: res.data.data.slice(0, this.state.pagination.pageSize * this.state.pagination.current - 1)
                })
            }
        }).catch(err => {
            console.log(err);
        })

    };

    /** 
     * 搜索组件提交搜索框内容，过滤查找一下
     * 更新一下state
    */
    searchChange(value) {
        this.setState({
            selectValue: value.selectValue,
            keyWord: value.keyWord
        }, async () => {
            await this.inintData();

            // 当关键词不为空时筛选查询
            if (this.state.keyWord !== "") {
                // 按照条件筛选过的数据存放的数组
                let filterDataArr = []
                // 如果this.state.selectValue为productId时按照id筛选，没有则按照名字筛选
                if (this.state.selectValue === "productId") {
                    filterDataArr = this.state.data.filter(item => {
                        if (this.state.keyWord === item.id.toString()) return item;
                    })
                } else {
                    filterDataArr = this.state.data.filter(item => {
                        if (item.name.includes(this.state.keyWord)) return item;
                    })
                }
                // 更新出筛选的数据
                this.setState({
                    data: filterDataArr,
                    // 当前页面的数据，页数乘以每页多少数据
                    currentPageData: filterDataArr.slice(0, this.state.pagination.pageSize * this.state.pagination.current - 1),
                    pagination: Object.assign({}, this.state.pagination, { total: filterDataArr.length })
                })
                // 提示用户是否查询成功
                if (filterDataArr.length > 0) {
                    message.success("查询成功")
                }else {
                    message.warning("查询不到你想要的分类")
                }
            }

        })


    }

    // 点击详情按钮跳转到对应商品的详情页面
    jumpProductDetail(data) {
        this.props.history.push({ pathname: '/product/detail', state: { id: data.id } });
    }

    render() {
        // 表头
        const columns = [
            {
                title: '分类ID',
                dataIndex: 'id',
                // width: '4rem',
            },
            {
                title: '分类名称',
                dataIndex: 'name',
                // width: '20%',
            },
            {
                title: '操作',
                // width: '10%',
                render: (data, record) => <span className="optionWrap">
                    <a className="option" onClick={() => this.jumpProductDetail(record)}>修改名称</a>
                </span>
            }
        ];

        const { currentPageData, pagination, loading } = this.state;
        return (
            <div className="productManage">
                <ContentTitle title="分类列表" />
                {/* 新增商品按钮 */}
                <div className="addProduct">
                    <Link to="/product/categories/add">
                        <Button type="primary" shape="round" icon={<PlusOutlined />}  >
                            添加分类
                        </Button>
                    </Link>
                </div>
                <ProductSearch title="分类" onChange={(value) => this.searchChange(value)} />
                {/* 表格 */}
                <Table
                    style={{ overflow: "auto" }}
                    columns={columns}
                    rowKey={() => Math.random() * 1000000}
                    dataSource={currentPageData}           // 用户数据
                    pagination={pagination}     // 分页配置参数
                    loading={loading}           // 是否开启加载
                    onChange={this.handleTableChange}   // 分页改变触发回调函数
                    bordered={true}             // 是否显示边框
                />
            </div>
        );
    }
}
export default withRouter(ProductCategories)