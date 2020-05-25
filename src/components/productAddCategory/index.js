import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from "axios";
import "./index.scss"
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
    },
};
const formTailLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 8,
        offset: 4,
    },
};

// 组件
const ProductAddCategory = (props) => {
    const [form] = Form.useForm();
    const [firstCategory, setFirstCategory] = useState([]);
    // const [editCategory,setEditCategory] = useState(false); //是否是修改分类页面

    // 如果是编辑分类，通过路由传参的id请求该商品的信息，并把信息入对应的表单中
    // const initEditData = () => {
    //     if (props.location.state) {
    //         console.log(props.location.state)
    //         axios({
    //             method: "get",
    //             url: "/manage/category/get_category.do",
    //             params: {
    //                 categoryId: props.location.state.id
    //             }
    //         }).then(res => {
    //             console.log(res.data)

    //             // antd 中设置表单某项的值
    //             form.setFieldsValue({ parentId: props.location.state.id });
    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     }

    // }

    // 提交表单 ,提交成功返回商品管理界面
    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            console.log(values)
            // 请求数据
            axios({
                method: "get",
                url: "/manage/category/add_category.do",
                params: { ...values }
            }).then(res => {
                if (res.data.status === 0) {
                    message.success(res.data.data);
                    props.history.push("/product/categories");
                }
            }).catch(err => {
                console.log(err);
            })
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    // 初始化商品分类
    const initProductCategory = () => {
        axios({
            method: "get",
            url: "/manage/category/get_category.do"
        }).then(res => {
            if (res.data.status === 0) {
                setFirstCategory(res.data.data);
            }
        }).catch(err => {
            console.log(err);
        })
    }


    // 生命周期组件初始化
    useEffect(() => {
        initProductCategory();
    }, [])

    // 生命周期组件更新
    useEffect(() => {
        // initEditData();
    }, [firstCategory])

    return (
        <div className="productEdit">
            <Form form={form} name="dynamic_rule">

                {/* 一级分类 */}
                <Form.Item
                    {...formItemLayout}
                    name="parentId"
                    label="一级分类"

                    rules={[
                        {
                            required: true,
                            message: '内容不能为空',
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择一级分类"
                        allowClear
                    >
                        {firstCategory.map(item => {
                            return (
                                <Option
                                    value={item.id}
                                    key={item.id}
                                >
                                    {item.name}
                                </Option>)
                        })}
                    </Select>
                </Form.Item>


                {/* 二级分类 */}
                <Form.Item
                    {...formItemLayout}
                    name="categoryName"
                    label="二级分类"
                    rules={[
                        {
                            required: true,
                            message: '内容不能为空',
                        },
                    ]}
                >
                    <Input placeholder="请输入分类名称" />
                </Form.Item>

                {/* 提交 */}
                <Form.Item {...formTailLayout} className="submit">
                    <Button type="primary" onClick={onCheck} block>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default ProductAddCategory;