import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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
const ProductEdit = (props) => {
    const [form] = Form.useForm();
    const [firstCategory, setFirstCategory] = useState([]);
    const [secondCategory, setSecondCategory] = useState([]);

    // 校验name字段
    const validateProductName = (rule, value, callback) => {
        // console.log(value)
        // if (value !== "11") {
        // console.log("aaa")
        // return Promise.reject("");
        // } else {
        return Promise.resolve();
        // }
    }

    // 提交表单 ,提交成功返回商品管理界面
    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            axios({
                method: "get",
                url: "/manage/product/save.do",
                params: { ...values }
            }).then(res => {
                if (res.data.status === 0) {
                    message.success(res.data.data);
                    props.history.push("/product/manage");
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

    // 如果是编辑商品，通过路由传参的id过去该商品的信息，并把信息入对应的表单中
    const initEditData = () => {
        axios({
            method: "get",
            url: "/manage/product/detail.do",
            params: {
                productId: props.location.state.id
            }
        }).then(res => {
            let objData = res.data.data;
            // 用正则清除标签
            objData["detail"] = objData["detail"].replace(/<[a-zA-z]+>|<\/[a-zA-z]+>/g, "");
            // console.log(firstCategory)
            // antd 中设置表单某项的值
            form.setFieldsValue(objData);
        }).catch(err => {
            console.log(err);
        })
    }

    // 当选择一级分类，给二级分类赋值
    const changeFirstCategory = (value) => {
        // antd 中设置表单某项的值
        form.setFieldsValue({ categoryId: "" });
        axios({
            method: "get",
            url: "/manage/category/get_category.do",
            params: {
                categoryId: value
            }
        }).then(res => {
            if (res.data.status === 0) {
                setSecondCategory(res.data.data);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    // 图片上传后的回调
    const normFile = e => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    // 生命周期
    useEffect(() => {
        initProductCategory();
        initEditData();
    }, [])

    return (
        <div className="productEdit">
            <Form form={form} name="dynamic_rule">

                {/* 商品名称 */}
                <Form.Item
                    {...formItemLayout}
                    name="name"
                    label="商品名称"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '内容不能为空',
                        },
                        {
                            validator: validateProductName
                        }
                    ]}
                    hasFeedback
                >
                    <Input placeholder="请输入商品名称" />
                </Form.Item>

                {/* 商品描述 */}
                <Form.Item
                    {...formItemLayout}
                    name="subtitle"
                    label="商品描述"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '内容不能为空',
                        },
                    ]}
                >
                    <Input placeholder="请输入商品描述" />
                </Form.Item>

                {/* 一级分类 */}
                <Form.Item
                    {...formItemLayout}
                    name="productFirstCategory"
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
                        onChange={changeFirstCategory}
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
                    name="categoryId"
                    label="二级分类"
                    rules={[
                        {
                            required: true,
                            message: '内容不能为空',
                        },
                    ]}
                >
                    <Select
                        placeholder="请选择二级分类"
                        allowClear
                    >
                        {secondCategory.map(item => {
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


                {/* 商品价格 */}
                <Form.Item
                    {...formItemLayout}
                    name="price"
                    label="商品价格"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '内容不能为空',
                        },
                    ]}
                >
                    <InputNumber
                        min={0}
                        max={100000000}
                        step="5"
                        formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/￥\s?|(,*)/g, '')}
                    />
                </Form.Item>

                {/* 商品库存 */}
                <Form.Item
                    {...formItemLayout}
                    name="stock"
                    label="商品库存"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '内容不能为空',
                        },
                    ]}
                >
                    <InputNumber
                        min={0}
                        max={100000000}
                        step="5"
                        formatter={value => `${value}件`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/件\s?|(,*)/g, '')}
                    />
                </Form.Item>

                {/* 商品图片 */}
                <Form.Item
                    {...formItemLayout}
                    name="upload"
                    label="商品图片"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="upload_file" action="/manage/product/upload.do" listType="picture">
                        <Button>
                            <UploadOutlined />点击上传
                        </Button>
                    </Upload>
                </Form.Item>

                {/* 商品详情 */}
                <Form.Item
                    {...formItemLayout}
                    name="detail"
                    label="商品详情"
                    validateTrigger="onBlur"
                    rules={[
                        {
                            required: true,
                            message: '内容不能为空',
                        },
                    ]}
                >
                    <Input.TextArea />
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
export default ProductEdit;