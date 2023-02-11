import React, { useRef } from 'react';
import axios from 'axios';
import { Button, Input } from 'antd';
import { useSelector } from 'react-redux';
import qs from 'qs';   //发送post请求参数时将参数序列化
import { nanoid } from 'nanoid'
import getdate from '../../../component/GetDate/getdate';  //获取当前时间
import Editor from '../../../component/Editor/Editor';


function AddArtilces() {
  const editorContext = useSelector(state => (state.EditorReducer.editorContext));   //需要提交的内容
  const titleRef = useRef();  //标题
  const subtitleRef = useRef();  //副标题


  const HandleContext = () => {
    let title = titleRef.current.input.value;   //获取标题
    let subtitle = subtitleRef.current.input.value;   //获取标题
    let reg = /http.*?jpg/g;                     //从字符串中匹配照片url作为封面图，如果没有匹配到就会返回null，匹配到返回数组
    let coverPhoto = editorContext.match(reg) === null ? '' : editorContext.match(reg)[0]
    let data = {                                 //要传输的数据
      "title": title,
      "subtitle": subtitle,
      "editContext": `${editorContext}`,
      "date": `${getdate()}`,
      "author": "赵智",
      "point": '0',
      "view": '0',
      "comment": '0',
      "cover": coverPhoto,
      "key": `${nanoid()}`
    }
    console.log(data)
    axios.post(`/blogs/handle`, qs.stringify(data)).then(res => {
      if (res.data.msg === 'TimeOut') {        //token过期则删除token
        window.localStorage.removeItem("token");
      } else {
        console.log('上传成功', res);
      }
    }).catch(err => {
      console.log("上传失败", err);
    })
  }


  return (
    <div>
      <Input placeholder="请输入标题" style={{ width: '30%', margin: '0  6vw 1.5vh 0' }} ref={titleRef} />
      <Input placeholder="请输入副标题" style={{ width: '50%', margin: '0  0 1.5vh' }} ref={subtitleRef} />
      <Button type="primary" style={{ margin: "0 0 2vh 0", float: "right" }} onClick={HandleContext}>提交</Button>
      <Editor  ></Editor>
    </div>
  )
}

export default AddArtilces