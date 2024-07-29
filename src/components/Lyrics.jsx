const Lyrics = ({ lyrics }) => {
  return (
    <div className="pt-4 overflow-y-auto h-[calc(100%-3.5rem)] px-4 text-center">
      <pre className="text-white font-palanquin text-3xl whitespace-pre-line">
        {lyrics}
      </pre>
      <br />
      <br />
    </div>
  );
};

export default Lyrics;
