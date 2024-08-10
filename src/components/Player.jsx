import NowPlaying from "./NowPlaying";
import Lyrics from "./Lyrics";
import { PlayerProvider } from '../contexts/player';

const Player = () => {
    return (

      <PlayerProvider>
        <div className="bg-[#121212] w-[95%] m-2 h-3/4 overflow-hidden rounded-lg relative">
          <NowPlaying />
          <Lyrics />
        </div>
      </PlayerProvider>
    );
};

export default Player;
