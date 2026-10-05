import './index.scss';
import SideBar from '../SideBar/SideBar'
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loader from 'react-loaders';

const LOADER_DURATION = 1150;

export default function Layout () {
    const { pathname } = useLocation();
    const [loadedPath, setLoadedPath] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setLoadedPath(pathname), LOADER_DURATION);
        return () => clearTimeout(timer);
    }, [pathname]);

    const loading = loadedPath !== pathname;

    return (
        <div className="App">
            <SideBar />
            <div className = "page">
                {loading ? <Loader type="pacman" active /> : <Outlet />}
            </div>
        </div>
    )
}
