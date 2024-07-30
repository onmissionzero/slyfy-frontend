import { useEffect, useState } from "react";

import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";
import Player from "./components/Player";
import Footer from "./components/Footer";

import { ProfileProvider } from "./contexts/profile";


function App() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({ id: '', display_name: '', pfp_url: '' });

  useEffect(() => {
    const userData = localStorage.getItem("profile");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setProfile(parsedUserData);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => { //Runs when backend returns user data as query params
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      return {
        id: searchParams.get("user_id"),
        display_name: searchParams.get("display_name"),
        pfp_url: searchParams.get("pfp_url"),
      };
    };

    const queryParams = getQueryParams();
    if (queryParams.id && queryParams.display_name && queryParams.pfp_url) {
      const newProfile = {
        id: queryParams.id,
        display_name: queryParams.display_name,
        pfp_url: queryParams.pfp_url,
      };

      localStorage.setItem("profile", JSON.stringify(newProfile));
      setProfile(newProfile);
      setIsLoggedIn(true);

      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = `${backendURL}/authorize`;
  };

  return (
    <ProfileProvider value={profile}>
      <div
        className={`bg-black h-screen min-h-max flex flex-col ${
          isLoggedIn ? 'justify-start' : 'justify-center'
        } items-center`}
      >
        {!isLoggedIn ? (
          <LoginButton text="Login" handle={handleLogin} />
        ) : (
          <>
            <Profile />
            <Player backendURL={backendURL} />
          </>
        )}
        <Footer />
      </div>
    </ProfileProvider>
  );
}

export default App;
