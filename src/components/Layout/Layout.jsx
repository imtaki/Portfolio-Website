import './index.scss';
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom';

export default function Layout () {
    return (
        <div className="App">
            <SideBar /> 
            <div className = "page">
                <Outlet />
            </div>
        </div>
    )
}