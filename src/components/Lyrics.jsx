import usePlayer from "../contexts/player";

const Lyrics = () => {

  const { player } = usePlayer();
  const { error, lyrics } = player || {};

  return (
    <div className="pt-4 overflow-y-auto h-[calc(100%-3.5rem)] px-4 text-center">
      <pre className="text-white font-palanquin text-3xl whitespace-pre-line">
        {error || lyrics || "Loading..."}
      </pre>
      <br />
      <br />
    </div>
  );
};

export default Lyrics;