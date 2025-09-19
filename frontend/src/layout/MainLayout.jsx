import React from 'react';
import './main-layout.css'
import Sidebar from "./sidebar/Sidebar";
import {Outlet} from "react-router-dom";
import Header from "../components/header/Header";

const MainLayout = () => {
    return (
        <div className='main-container'>
            <Sidebar />
            <div className='main-content'>
                <Header />
                <div className='page-content'>
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;