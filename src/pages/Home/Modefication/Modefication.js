import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { Button, Input, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';   //发送post请求参数时将参数序列化
import getdate from '../../../component/GetDate/getdate';  //获取当前时间
import '@wangeditor/editor/dist/css/style.css' // 引入富文本编辑器的 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react'


function Modefication() {

  let [title, setTitle] = useState();//获取标题
  let [subtitle, setSubTitle] = useState();//获取标题
  const dispatch = useDispatch();
  const editorContext = useSelector(state => (state.EditorReducer.editorContext));   //需要提交的内容

  const location = useLocation();   //获取要usenavigate传递来的state进行修改;
  let key = location.state;

  const [editor, setEditor] = useState(null)               // editor 实例
  const [html, setHtml] = useState()         // 编辑器内容
  const toolbarConfig = {}                        // 工具栏配置
  const editorConfig = {                           // 编辑器配置
    placeholder: '请输入内容...',
    MENU_CONF: {}
  }
  // console.log(key)
  editorConfig.MENU_CONF['uploadImage'] = {

    server: 'http://localhost:5000/upload',       //目的端口
    maxFileSize: 6 * 1024 * 1024, // 4M  // 单个文件的最大体积限制，默认为 2M
    maxNumberOfFiles: 10,       // 最多可上传几个文件，默认为 100
    // metaWithUrl: true, // 参数拼接到 url 上
    allowedFileTypes: ['image/*'],// 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
    // withCredentials: true, // 跨域是否传递 cookie ，默认为 false
    timeout: 5 * 1000, // 5 秒   // 超时时间，默认为 10 秒

    customInsert(res, insertFn) {              // res 即服务端的返回结果     
      // console.log(res, 1)
      // 从 res 中找到 url alt href ，然后插入图片
      insertFn(res.data.url, res.data.alt, res.data.href)
    },

    onBeforeUpload(file) {        // 上传之前触发
      // file 选中的文件，格式如 { key: file }
      console.log(file, 1)
      return file

      // 可以 return
      // 1. return file 或者 new 一个 file ，接下来将上传
      // 2. return false ，不上传这个 file
    },

    onProgress(progress) {              // 上传进度的回调函数
      // progress 是 0-100 的数字
      console.log('progress', progress)
    },

    onSuccess(file, res) {                 // 单个文件上传成功之后
      console.log(`${file.name} 上传成功`, res)
      // window.localStorage.setItem('coverPhoto',res.data.)
    },

    onFailed(file, res) {              // 单个文件上传失败
      console.log(`${file.name} 上传失败`, res);
    },

    onError(file, err, res) {                   // 上传错误，或者触发 timeout 超时     
      console.log(`${file.name} 上传出错`, err, res)
    },
  }

  const HandleContext = () => {
    let reg = /http.*?jpg/g;                     //从字符串中匹配照片url作为封面图，如果没有匹配到就会返回null，匹配到返回数组
    let coverPhoto = editorContext.match(reg) === null ? '' : editorContext.match(reg)[0]
    console.log(editorContext)
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

  useEffect(() => {
    axios.get('/blogs').then(res => {
      if (res.data.msg === 'TimeOut') {        //token过期则删除token
        window.localStorage.removeItem("token");
      } else {
        for (let item of res.data) {
          if (item["key"] === key) {
            // console.log(item)
            setTitle(item.title);
            setSubTitle(item.subtitle);
            setHtml(item.editContext)
          }
        }
      }
    })
  }, [])

  useEffect(() => {
    // 及时销毁 editor ，重要！
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  return (
    <div>
      {
        subtitle === undefined ? <Spin size="large" style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center'
        }} /> :
          <div>
            < Input placeholder="请输入标题" style={{ width: '30%', margin: '0  6vw 1.5vh 0' }} value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <Input placeholder="请输入副标题" style={{ width: '50%', margin: '0  0 1.5vh' }} value={subtitle} onChange={(e) => { setSubTitle(e.target.value) }} />
            <Button type="primary" style={{ margin: "0 0 2vh 0", float: "right" }} onClick={HandleContext}>提交</Button>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
              <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
              />
              <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editor => { dispatch({ type: 'update', editorContext: editor.getHtml() }); return setHtml(editor.getHtml()) }}
                mode="default"
                style={{ height: '500px', overflowY: 'hidden' }}
              />
            </div>
          </div>}
    </div>
  )
}

export default Modefication