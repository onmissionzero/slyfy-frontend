import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useProfile from "../contexts/profile";

import Header from "../components/Header";
import Seo from "../components/Seo";

function Settings() {
  const navigate = useNavigate();
  const { profile, loading, error } = useProfile();

  useEffect(() => {
    if (!loading && (!profile || error)) {
      navigate('/login');
    }
  }, [loading, profile, error, navigate]);

  if (loading) {
    return <div className="text-white font-palanquin font-3xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-white font-palanquin font-3xl">An error occurred. Redirecting...</div>;
  }

  if (!profile) {
    return <div className="text-white font-palanquin font-3xl">Redirecting...</div>;
  }

  return (
    <>
      <Seo
        title="Settings | Slyfy"
        description="Set your settings for Slyfy."
        image="https://raw.githubusercontent.com/onmissionzero/slyfy-frontend/main/public/opengraph-image.png"
        url="https://slyfy.vercel.app/settings"
      />
      <Header />
      <div>
        <h1 className="text-white font-montserrat">Settings</h1>
        <h2 className="text-white font-montserrat">Yet to be implemented</h2>
      </div>
    </>
  );
}

export default Settings;
