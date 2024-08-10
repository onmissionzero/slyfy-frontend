import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Player from "../components/Player";
import Seo from "../components/Seo";

import useProfile from "../contexts/profile";

function Home() {
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
      title="Home | Slyfy"
      description="Lyrics wherever you want."
      image="https://raw.githubusercontent.com/onmissionzero/slyfy-frontend/main/public/opengraph-image.png"
      url="https://slyfy.vercel.app/"
      />
      <Header />
      <Player />
    </>
  );
}

export default Home;
