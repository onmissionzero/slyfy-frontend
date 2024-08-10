import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Player from "../components/Player";

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
      <Header />
      <Player />
    </>
  );
}

export default Home;
