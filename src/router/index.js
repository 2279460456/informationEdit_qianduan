import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/login';
import Home from '../pages/Home/home';
import NotFound from '../pages/NotFound/notfound'


function index() {
    return (
        <BrowserRouter >
            <Routes>
                <Route exact path='/' element={localStorage.getItem("token") ? <Home /> : <Login></Login>}></Route>
                <Route exact path='/login' element={<Login />}></Route>
                {/* 有二级路由的话必须在一级路由后写/* ！！！*/}
                <Route path='/home/*' element={localStorage.getItem("token") ? <Home /> : <Login />}></Route>
                <Route path='/*' element={<NotFound></NotFound>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default index