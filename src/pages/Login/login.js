import React from 'react';
import axios from 'axios';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    const navigate = useNavigate();

    let onFinish = (date) => {
        const { username, password } = date;
        axios.post(`/login?username=${username}&password=${password}`).then(
            res => {
                if (res.data === false || res.data.msg === 'TimeOut') {   //类型为obj即token过期
                    message.error('用户不存在或密码不正确');
                    window.localStorage.removeItem("token");
                } else {
                    localStorage.setItem("token", res.data);
                    navigate('/home');
                }
            }
        ).catch(err => {
            console.log(err);
        })
    }

    return (
        <div style={{ background: "rgb(35,39,65)", height: '100%' }}>
            <div className='formContainer'>
                <div className='logintitle'>blogs-manager</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username" autoComplete="off" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login