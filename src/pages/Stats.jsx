import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useProfile from "../contexts/profile";

import Header from "../components/Header";
import Seo from "../components/Seo";
import RadioButton from "../components/RadioButton";
import TopComponent from "../components/TopComponent";

function Stats() {
  const navigate = useNavigate();
  const { profile, topTracks, topArtists, loading, error } = useProfile();
  const [selectedTerm, setSelectedTerm] = useState('medium_term');

  const handleSelect = (option) => {
    setSelectedTerm(option);
  };

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
        title="Stats | Slyfy"
        description="View your stats."
        image="https://raw.githubusercontent.com/onmissionzero/slyfy-frontend/main/public/opengraph-image.png"
        url="https://slyfy.vercel.app/stats"
      />
      <Header />
      <RadioButton onSelect={handleSelect} defaultValue={selectedTerm}></RadioButton>
{/*       <p className="font-palanquin text-white">Selected Option: {selectedTerm}</p> */}
      <div className="flex justify-between m-2 w-full max-h-[22rem] mb-8">
        <TopComponent top={topTracks} name="Top Tracks" type="tracks" selectedOption={selectedTerm}></TopComponent>
        <TopComponent top={topArtists} name="Top Artists" type="artists" selectedOption={selectedTerm}></TopComponent>
      </div>
    </>
  );
}

export default Stats;
