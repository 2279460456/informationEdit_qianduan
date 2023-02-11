import React from 'react';
import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom';
const { Sider } = Layout;


function SideMenu(Props) {
    const navigate = useNavigate();
    const isCollapsed = useSelector(state => (state.CollapsedReducer.isCollapsed));         //等价于mapStateToProps ，获取状态
    const location = useLocation();                 //获取当前url使sidemenu跟随高亮显示
    const select_str = [location.pathname][0];
    let selectArr = select_str.split("/");
    let selectKeys = ['/' + selectArr[1] + '/' + selectArr[2]];
    let openKeys = ['/' + selectArr[1]];
    // console.log(selectKeys)

    return (
        <Sider trigger={null} collapsible={false} collapsed={isCollapsed}>
            {/* 侧边栏项数展开以后如果超出屏幕最大高度,则出现滚动条 */}
            <div style={{ display: 'flex', height: '100%', "flexDirection": "column" }}>
                <div className="logo" style={{}} > manager </ div>
                {/* 侧边栏项数展开以后如果超出屏幕最大高度,则出现滚动条 */}
                <div style={{ flex: 1, "overflow": "auto" }}>
                    {/* defaultSelectedKeys属性默认高亮的侧边栏选项  defaultOpenKeys属性为默认打开侧边栏子选项的父选项 */}
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={selectKeys}
                        defaultOpenKeys={openKeys}
                        items={[
                            {
                                key: '/home/view',
                                icon: <UserOutlined />,
                                label: '审阅',
                                // onClick: (e) => {
                                //     // console.log(e)
                                //     navigate("/home/view")
                                // },
                                children: [
                                    {
                                        key: '/home/viewarticles',
                                        icon: <UserOutlined />,
                                        label: '审阅文章',
                                        onClick: (e) => {
                                            // console.log(e)
                                            navigate("/home/viewarticles")
                                        },
                                    }, {
                                        key: '/home/viewmovies',
                                        icon: <UserOutlined />,
                                        label: '审阅电影',
                                        onClick: (e) => {
                                            // console.log(e)
                                            navigate("/home/viewmovies")
                                        },
                                    }
                                ]
                            },
                            {
                                key: '/home/add',
                                icon: <VideoCameraOutlined />,
                                label: '添加',
                                children: [
                                    {
                                        key: '/home/addarticles',
                                        icon: <UserOutlined />,
                                        label: '添加文章',
                                        onClick: (e) => {
                                            // console.log(e)
                                            navigate("/home/addarticles")
                                        },
                                    }, {
                                        key: '/home/addmovies',
                                        icon: <UserOutlined />,
                                        label: '添加电影',
                                        onClick: (e) => {
                                            // console.log(e)
                                            navigate("/home/addmovies")
                                        },
                                    }
                                ]
                            },
                            {
                                key: '/home/modefication',
                                icon: <UploadOutlined />,
                                label: '修改文章',
                                onClick: (e) => {
                                    navigate("/home/movies")
                                }
                            },
                        ]}
                    />
                </div>
            </div>
        </Sider>
    )
}

export default SideMenu