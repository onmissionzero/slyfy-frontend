import { Outlet } from 'react-router-dom';

import Footer from './components/Footer';
import useProfile from './contexts/profile';

function Layout() {

    const { profile } = useProfile();
    
    return (
        <div
        className={`bg-black h-screen min-h-max flex flex-col ${
            profile ? 'justify-start' : 'justify-center'
        } items-center relative`}
        >
            <Outlet />
            <Footer />
        </div>
    );
}

export default Layout;
