import React, { } from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { CollapsedAction } from '../../redux/actions/CollapsedActions'
const { Header } = Layout;



function TopHeader(Props) {
    const navigate = useNavigate();
    const isCollapsed = useSelector(state => (state.CollapsedReducer.isCollapsed));         //等价于mapStateToProps ，获取状态
    const dispatch = useDispatch();

    //退出登录
    const logout = () => {
        localStorage.removeItem('token'); //清除token
        navigate('/login');
    }

    const menu = (
        <Menu>
            <Menu.Item>
                {'管理员'}
            </Menu.Item>
            <Menu.Item danger onClick={() => {
                logout();
            }}>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <Header className="site-layout-background" style={{ padding: "0 16px" }}>
            {/* 在多个reducers的react-redux中Props.isCollapsed.CollapsedReducer.isCollapsed才是状态 */}
            {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => { dispatch(CollapsedAction) },
            })}
            <div style={{ float: "right" }}>
                <span style={{ margin: "0 5px 0 0" }}>欢迎<span style={{ color: "#1890ff" }}>{'大大怪'}</span>回来</span>
                <Dropdown overlay={menu}>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Header>
    )
}

export default TopHeader