import usePlayer from "../contexts/player";
import ProgressBar from "./ProgressBar";

const NowPlaying = () => {
  const { player, simulatedProgress } = usePlayer();
  const {
    cover_art = "https://fakeimg.pl/64x64/000000/ffffff?text=+",
    spotify_url = "",
    track_name = "Track Name",
    artists = "Artists",
    duration = 69
  } = player || {};

  return (
    <div className="flex items-center bg-[#242424] h-20 w-full px-4 shadow-2xl shadow-black font-palanquin overflow-hidden">
      <a 
        href={spotify_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex m-2 relative group"
      >
        {cover_art && (
          <div className="relative">
            <img
              src={cover_art}
              alt="Cover Art"
              className="w-14 h-14 rounded-full"
            />
            <img
              src="/arrow-up-right.svg"
              alt="Arrow Icon"
              className="w-3 h-3 absolute top-0 right-0 transform translate-x-1 -translate-y-1 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
            />
          </div>
        )}
      </a>
      <div className="ml-2 flex-1">
        <p className="text-white md:text-2xl text-xl">{track_name}</p>
        <p className="text-[#858585] md:text-base text-sm">{artists}</p>
      </div>
      <div className="flex-grow m-2">
        <ProgressBar duration={duration} progress={simulatedProgress} />
      </div>
    </div>
  );
};

export default NowPlaying;