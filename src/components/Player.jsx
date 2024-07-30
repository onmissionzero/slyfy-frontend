import { useEffect, useState } from 'react';

import NowPlaying from "./NowPlaying";
import Lyrics from "./Lyrics";
import { PlayerProvider } from '../contexts/player';

const Player = ({ backendURL }) => {
  
  const [player, setPlayer] = useState({});

  useEffect(() => {
    const fetchSongInfo = async () => {
      try {
        const response = await fetch(backendURL + '/lyrics');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPlayer({
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
    <PlayerProvider value={ player }>
    <div className="bg-[#121212] w-[95%] m-2 h-3/4 overflow-hidden rounded-lg relative">
      <NowPlaying />
      <Lyrics />
    </div>
    </PlayerProvider>
  );
};

export default Player;
