import React, { useState, useEffect } from "react";
import { Modal, Input, message } from 'antd';
import axios from "axios";

const UpdateCategory = (props) => {
    const [visible, setVisible] = useState(false)
    const [inputValue, setInputValue] = useState("")


    useEffect(() => {
        if (props.visible === true) {
            setInputValue(props.updateCategoryData.name);
        }
        setVisible(props.visible)
    }, [props.visible])

    // 点击确定,提交数据
    const handleOk = e => {
        axios({
            method: "get",
            url: "/manage/category/set_category_name.do",
            params: {
                categoryId: props.updateCategoryData.categoryId,
                categoryName: inputValue
            }
        }).then(res => {
            if (res.data.status === 0) {
                message.success(res.data.data)
            } else {
                message.error(res.data.data)
            }
        }).catch(err => {
            console.log(err);
        })
        // 通知父组件关闭模态框
        props.updateOk();
    };

    // 点击取消,通知父组件关闭模态框
    const handleCancel = e => {
        props.closeModal();
    };

    // 实现input的双向绑定
    const changeValue = (e) => {
        setInputValue(e.target.value);
    }

    return (
        <div>
            <Modal
                title="分类名称"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input
                    value={inputValue}
                    onChange={(e) => changeValue(e)}
                    onPressEnter={handleOk}
                />
            </Modal>
        </div>
    );

}
export default UpdateCategory