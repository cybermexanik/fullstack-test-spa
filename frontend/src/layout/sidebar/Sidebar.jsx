import './sidebar.css'
import LogoImg from '../../assets/logo/logo.svg'
import {Link, useLocation} from "react-router-dom";
import { routes } from "../../routes/Router";
import { useContext, useEffect, useState } from 'react';
import { SidebarContext } from '../../context/sidebarContext';

const Sidebar = () => {
    const location = useLocation()
    const {isSidebarOpen} = useContext(SidebarContext)
    const [sidebarClass, setSidebarClass] = useState('')

    useEffect(() => {
        if(isSidebarOpen){
            setSidebarClass('sidebar-change')
        } else {
            setSidebarClass('')
        }
    }, [isSidebarOpen])

    return (
        <div className={`sidebar-main ${sidebarClass}`}>
            <div className="sidebar-header">
                <img
                    src={LogoImg}
                    alt="logo"
                />
            </div>

            <div className="sidebar-nav">
                <nav className="nav-list">
                    <ul className="nav-menu-items">
                    {routes[0].children.map((el) => {
                        const isActive = location.pathname === el.path
                        const linkClass = isActive ? 'nav-text active' : 'nav-text'

                        return (
                            <li className='nav-item' key={el.path}>
                                <Link to={el.path} className={linkClass}> 
                                    {el.icon}
                                    <span className='nav-title'>{el.name}</span>
                                </Link>
                            </li>
                        )
                    })}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar