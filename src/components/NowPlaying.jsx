import usePlayer from "../contexts/player";


const NowPlaying = () => {

  const { cover_art, track_name, artists, spotify_url } = usePlayer();
  
  return (
    <div className="flex justify-start items-center bg-[#242424] h-20 w-full sticky top-0 z-10 px-4 shadow-2xl shadow-black font-palanquin">
      <a href={spotify_url} target="_blank" rel="noopener noreferrer" className="m-2">
        {cover_art && (
          <img
            src={cover_art}
            alt="Cover Art"
            className="w-14 h-14 rounded-full transition duration-300 ease-in-out transform hover:scale-110"
          />
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