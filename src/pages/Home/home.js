import React, { } from 'react';
import { Layout } from 'antd';
import { Routes, Route } from 'react-router-dom';
import TopHeader from '../../component/TopHeader/topheader';
import SideMenu from '../../component/SideMenu/sidemenu';
import ViewArticle from './ViewArticle/ViewArticle';
import ViewMovies from './ViewMovies/ViewMovies';
import AddArtilces from './AddArticles/AddArtilces';
import AddMovies from './AddMovies/AddMovies';
import Modefication from './Modefication/Modefication';
import './home.css';
const { Content } = Layout;


function Home() {

    return (
        <Layout>
            <SideMenu></SideMenu>
            <Layout className="site-layout">
                <TopHeader></TopHeader>
                {/* overflow:auto使内容过多时不撑开主页内容，而是撑开content组件内容 */}
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        overflow: 'auto'
                    }}
                >
                    <Routes>
                        <Route path='/' element={<ViewArticle></ViewArticle>}></Route>
                        <Route path='/viewarticles' element={<ViewArticle />}></Route>
                        <Route path='viewmovies' element={<ViewMovies></ViewMovies>}></Route>
                        <Route path='/addarticles' element={<AddArtilces />}></Route>
                        <Route path='/addmovies' element={<AddMovies />}></Route >
                        <Route path='/modefication' element={<Modefication />}></Route>
                    </Routes >
                </Content >
            </Layout >
        </Layout >
    );

}

export default Home