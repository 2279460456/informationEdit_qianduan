import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ViewArticle() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const columns = [
        {
            title: '电影名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '类型',
            dataIndex: 'genre',
            key: 'genre',
        },
        {
            title: '日期',
            dataIndex: 'dateReleased',
            key: 'dateReleased',
        },
        {
            title: '豆瓣评分',
            dataIndex: 'doubanRating',
            key: 'doubanRating',
        },
        {
            title: '编辑',
            key: 'action',
            render: (item) => {
                return (
                    <div>
                        <Popconfirm
                            title="确定删除吗?"
                            onConfirm={() => { confirm(item) }}
                            onCancel={() => { message.error('Click on No'); }}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" size='small' danger >删除</Button>
                        </Popconfirm>

                    </div>)
            }
        },
    ];

    const confirm = (item) => {          //确认删除
        let { key } = item;
        // console.log(key);
        axios.delete(`/movies/delete?key=${key}`).then(res => {
            if (res.data.msg === 'TimeOut') {             //token过期则删除token
                window.localStorage.removeItem("token");
            } else {
                console.log('删除成功', res);
                message.success('Click on Yes');
                let newdata = [];             //修改状态，去掉删除的那一项
                for (let item of data) {
                    if (item.key !== key) {
                        newdata.push(item);
                    }
                }
                // console.log(newdata);
                setData(newdata);
            }
        }).catch(err => {
            console.log("删除失败", err);
        })
    };

    useEffect(() => {
        axios.get('/movies').then(res => {
            if (res.data.msg === 'TimeOut') {        //token过期则删除token
                window.localStorage.removeItem("token");
            } else {
                // console.log(res.data);
                setData(res.data);
            }
        }).catch(err => { console.log(err) })
    }, [])


    return (
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
    )
}


export default ViewArticle