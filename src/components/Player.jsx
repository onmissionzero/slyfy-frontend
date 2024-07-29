import React, { useState, useEffect } from 'react';
import NowPlaying from "./NowPlaying";
import Lyrics from "./Lyrics";

const Player = ({ backendURL }) => {
  const [songInfo, setSongInfo] = useState({
    cover_art: '',
    track_name: '',
    artists: [],
    spotify_url: '',
    lyrics: ''
  });

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        const response = await fetch(backendURL + '/lyrics');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSongInfo({
          cover_art: data.cover_art,
          track_name: data.track_name,
          artists: data.artists,
          spotify_url: data.spotify_url,
          lyrics: data.lyrics
        });
      } catch (error) {
        console.error('Error fetching song info:', error);
      }
    };

    fetchSongInfo();

    const interval = setInterval(fetchSongInfo, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#121212] w-[95%] m-2 h-3/4 overflow-hidden rounded-lg relative">
      <NowPlaying
        songInfo={{
          cover_art: songInfo.cover_art,
          track_name: songInfo.track_name,
          artists: songInfo.artists,
          spotify_url: songInfo.spotify_url
        }}
      />
      <Lyrics lyrics={songInfo.lyrics} />
    </div>
  );
};

export default Player;
