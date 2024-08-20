import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Player from "../components/Player";
import Seo from "../components/Seo";

import useProfile from "../contexts/profile";

function Home() {
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
        title="Home | Slyfy"
        description="Lyrics wherever you want."
        image="https://raw.githubusercontent.com/onmissionzero/slyfy-frontend/main/public/opengraph-image.png"
        url="https://slyfy.vercel.app/"
      />
      <Header profile={profile} />
      <Player />
    </>
  );
}

export default Home;
