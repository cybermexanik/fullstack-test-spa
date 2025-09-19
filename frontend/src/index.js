import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {SidebarProvider} from './context/sidebarContext'
import {RouterProvider} from 'react-router-dom';
import {router} from "./routes/Router";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SidebarProvider>
      <RouterProvider router={router}/>
    </SidebarProvider>
);