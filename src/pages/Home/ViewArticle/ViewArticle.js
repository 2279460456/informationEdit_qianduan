import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function ViewArticle() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '评论',
      dataIndex: 'comment',
      key: 'comment',
    }, {
      title: '观看量',
      dataIndex: 'view',
      key: 'view',
    }, {
      title: '点赞',
      dataIndex: 'point',
      key: 'point',
    }, {
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
            <Button type="primary" size='small' onClick={() => { fix(item) }} style={{ margin: '0 0 0 1vw' }} >修改</Button>
          </div>)
      }
    },
  ];

  const fix = (item) => {
    navigate(`/home/modefication`, { state: item.key });
  }

  const confirm = (item) => {          //确认删除
    let { key } = item;
    // console.log(key);
    axios.delete(`/blogs/delete?key=${key}`).then(res => {
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
    axios.get('/blogs').then(res => {
      if (res.data.msg === 'TimeOut') {        //token过期则删除token
        window.localStorage.removeItem("token");
      } else {
        // console.log(res.data);
        setData(res.data);
      }
    })
  }, [])


  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />
  )
}


export default ViewArticle