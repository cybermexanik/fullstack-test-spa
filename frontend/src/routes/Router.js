import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import TimeToLeaveOutlinedIcon from '@mui/icons-material/TimeToLeaveOutlined';
import { CarPage } from "../pages/car/CarPage";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { FactoryPage } from "../pages/factory/FactoryPage";
import MainLayout from "../layout/MainLayout";
import {createBrowserRouter} from "react-router-dom";


export const routes = [
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                index: true,
                name: 'Главная',
                key: 'dashboard',
                path: '/',
                icon: <DashboardOutlinedIcon/>,
                element: <DashboardPage/>,
            },
            {
                name: 'Автомобили',
                key: 'car',
                path: '/car',
                icon: <TimeToLeaveOutlinedIcon/>,
                element: <CarPage/>
            },
            {
                name: 'Производители',
                key: 'factory',
                path: '/factory',
                icon: <FactoryOutlinedIcon/>,
                element: <FactoryPage/>
            }
        ]
    }
]

export const router = createBrowserRouter(routes)