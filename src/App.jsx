import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";
import Player from "./components/Player";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setisLoggedin] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const userData = localStorage.getItem("profile");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setProfile(parsedUserData);
      setisLoggedin(true);
    } else {
      setisLoggedin(false);
    }
  }, []);

  const handleLogin = () => {
    window.location.href = backendURL + '/authorize';
  };

  useEffect(() => {
    const getQueryParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const id = searchParams.get("user_id");
      const display_name = searchParams.get("display_name");
      const pfp_url = searchParams.get("pfp_url");

      return { id, display_name, pfp_url };
    };

    const queryParams = getQueryParams();
    if (queryParams.id && queryParams.display_name && queryParams.pfp_url) {
      localStorage.setItem(
        "profile",
        JSON.stringify({
          id: queryParams.id,
          display_name: queryParams.display_name,
          pfp_url: queryParams.pfp_url,
        })
      );

      setProfile({
        id: queryParams.id,
        display_name: queryParams.display_name,
        pfp_url: queryParams.pfp_url,
      });
      setisLoggedin(true);

      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  return (
    <div 
    className={`bg-black h-screen min-h-max flex flex-col
      ${isLoggedin ? `justify-start` : `justify-center`} items-center`}
    >
      {
        isLoggedin ? 
        (
          <>
            <Profile profile={profile} />
            <Player backendURL={backendURL}/>
          </>
        )
        :
        (
          <>
            <LoginButton text="Login" handle={handleLogin}/>
          </>
        )
      }
      <Footer />
    </div>
  )
}

export default App
