import NowPlaying from "./NowPlaying";
import Lyrics from "./Lyrics";

const Player = () => {

  return (
    <div className="bg-[#121212] w-[95%] m-2 h-3/4 overflow-hidden rounded-lg relative">
      <NowPlaying />
      <Lyrics />
    </div>
  );
};

export default Player;
