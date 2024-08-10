import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useProfile from "../contexts/profile";

import Header from "../components/Header";

function Settings() {
  const navigate = useNavigate();
  const { profile } = useProfile();

  useEffect(() => {
    if (profile === null || profile === undefined) {
      navigate('/login');
    }
  }, [profile, navigate]);

  if (profile === null || profile === undefined) {
    return <div className="text-white font-palanquin font-3xl">Loading</div>
  }

  return (
    <>
      <Seo
      title="Settings | Slyfy"
      description="Set your settings for Slyfy."
      image="https://example.com/path/to/image.jpg"
      url="/settings"
      />
      <Header />
      <div className="">
        <h1 className="text-white font-montserrat">Settings</h1>
        <h1 className="text-white font-montserrat">Yet to be implemented</h1>
      </div>
    </>
  );
}

export default Settings;
