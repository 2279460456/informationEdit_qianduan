import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { useDispatch } from 'react-redux';
import '@wangeditor/editor/dist/css/style.css' // 引入富文本编辑器的 css


function MyEditor(Props) {
    const dispatch = useDispatch();
    const [editor, setEditor] = useState(null)               // editor 实例
    const [html, setHtml] = useState('')         // 编辑器内容
    const toolbarConfig = {}                        // 工具栏配置
    const editorConfig = {                           // 编辑器配置
        placeholder: '请输入内容...',
        MENU_CONF: {}
    }

    editorConfig.MENU_CONF['uploadImage'] = {
        server: 'http://localhost:5000/upload/handlepic',       //目的端口
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
    useEffect(() => {

        // 及时销毁 editor ，重要！
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
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
    )
}

export default MyEditor