import usePlayer from "../contexts/player";

const NowPlaying = () => {

  const { player } = usePlayer();
  const {
    cover_art = "",
    spotify_url = "",
    track_name = "Track Name",
    artists = "Artists",
  } = player || {};

  return (
    <div className="flex items-center bg-[#242424] h-20 w-full sticky top-0 z-10 px-4 shadow-2xl shadow-black font-palanquin">
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
      <div className="ml-2">
        <p className="text-white text-2xl">{track_name}</p>
        <p className="text-[#858585] text-md">{artists}</p>
      </div>
    </div>
  );
};

export default NowPlaying;
