import { useRef, useState, useEffect } from "react";
import useProfile from "../contexts/profile";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    const profileRef = useRef(null);
    
    const { profile, updateProfile } = useProfile();
    const  { display_name, pfp_url } = profile;

    const handleProfileClick = () => {
        setShowDropdown(prev => !prev);
    };

    const handleLogout = async () => {
        const backendURL = import.meta.env.VITE_BACKEND_URL;
        try {
            await fetch(`${backendURL}/logout`, {
                method: 'POST',
                credentials: 'include'
            });

            localStorage.removeItem('profile');
            setShowDropdown(false);
            updateProfile(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    const handleKeyDown = (event) => {
        switch (event.key) {    
            case "Escape":
                setShowDropdown(false);
                break;
        }
    };

    useEffect(() => {
        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [showDropdown]);

    useEffect(() => {
        setShowDropdown(false);
    }, [location]);

    return (
        <>
            <div className="flex justify-between items-center w-full text-white font-montserrat bg-[#121212] px-4 h-16 rounded-b-lg">
                <h2>Hello, {display_name}</h2>
                <h1
                    className="font-bold text-3xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
                    onClick={() => navigate('/')}
                >
                    Slyfy
                </h1>
                <img
                    src={pfp_url}
                    alt="Profile Picture"
                    className="w-11 h-11 rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 ease-in-out border-2 border-transparent hover:border-white"
                    onClick={handleProfileClick}
                />
            </div>
            {showDropdown && (
                <div 
                    className="absolute z-50 top-12 right-4 mt-2 w-48 bg-[#121212] text-white p-2 rounded-lg shadow-lg"
                    ref={profileRef}
                >
                    <button
                        onClick={() => navigate('/faq')}
                        className="w-full text-left px-4 py-2 rounded hover:bg-[#dbdbdb] hover:text-[#121212]
                        focus:outline-none focus:bg-[#dbdbdb] focus:text-[#121212]"
                    >
                        FAQ
                    </button>
                    <button
                        onClick={() => navigate('/settings')}
                        className="w-full text-left px-4 py-2 rounded hover:bg-[#dbdbdb] hover:text-[#121212]
                        focus:outline-none focus:bg-[#dbdbdb] focus:text-[#121212]"
                    >
                        Settings
                    </button>
                    <hr className="border-[#474747]" />
                    <button 
                        onClick={handleLogout} 
                        className="w-full text-left my-2 px-4 py-2 rounded hover:bg-[#dbdbdb] hover:text-[#121212]
                        focus:outline-none focus:bg-[#dbdbdb] focus:text-[#121212]"
                    >
                        Logout
                    </button>
                    <hr className="border-[#474747]" />
                </div>
            )}
        </>
    );
}

export default Header;
