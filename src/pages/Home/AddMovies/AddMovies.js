import React, { useRef } from 'react';
import { Button, Form, Input, message } from 'antd';
import { nanoid } from 'nanoid';
import axios from 'axios';
import qs from 'qs';   //发送post请求参数时将参数序列化

function AddMovies() {
    const nameRef = useRef();
    const genreRef = useRef();
    const hrefRef = useRef();
    const dateReleasedRef = useRef();
    const doubanRatingRef = useRef();
    const posterRef = useRef();

    const [messageApi, contextHolder] = message.useMessage();  //全局提示（antd组件库）
    const info = () => {       //提交成功后显示
        if (nameRef.current.input.value && genreRef.current.input.value && hrefRef.current.input.value && dateReleasedRef.current.input.value && doubanRatingRef.current.input.value && posterRef.current.input.value) {
            messageApi.info('提交成功');
        }
    };

    const layout = {             //表格样式
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 15,
        },
    };

    const validateMessages = {             //表格的一些输入规定(antd自带)
        required: '${label} is required!',
    };

    const declearInput = () => {   //提交完清除表单内容
        nameRef.current.input.value = '';
        genreRef.current.input.value = '';
        hrefRef.current.input.value = '';
        dateReleasedRef.current.input.value = '';
        doubanRatingRef.current.input.value = '';
        posterRef.current.input.value = '';
    }

    const onFinish = (values) => {
        let result = values;
        result.key = nanoid();   //添加key
        // console.log( result);
        axios.post(`/movies/handle`, qs.stringify(result)).then(res => {
            if (res.data.msg === 'TimeOut') {        //token过期则删除token
                window.localStorage.removeItem("token");
            } else {
                console.log('上传成功', res);
                declearInput();
            }
        }
        ).catch(err => { console.log('上传失败', err) })
    };

    return (
        <div style={{ marginTop: "10vh" }}>
            {contextHolder}
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item
                    name={['name']}
                    label="电影名称"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input ref={nameRef} />
                </Form.Item>
                <Form.Item
                    name={['genre']}
                    label="电影类型"
                    rules={[
                        {
                            required: true,

                        },
                    ]}
                >
                    <Input ref={genreRef} />
                </Form.Item>
                <Form.Item
                    name={['href']}
                    label="豆瓣路径"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input ref={hrefRef} />
                </Form.Item>
                <Form.Item
                    name={['dateReleased']}
                    label="初映时间"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input ref={dateReleasedRef} />
                </Form.Item>
                <Form.Item
                    name={['doubanRating']}
                    label="豆瓣评分"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input ref={doubanRatingRef} />
                </Form.Item>
                <Form.Item
                    name={['poster']}
                    label="封面图"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input ref={posterRef} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 10,
                    }}
                >
                    <Button type="primary" htmlType="submit" onClick={info}>
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default AddMovies