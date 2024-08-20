const formatTime = (seconds) => {
  if (seconds == null) return "00:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const ProgressBar = ({ duration, progress }) => {
  return (
    <div>
      <progress
        value={progress}
        max={duration}
        className="w-full h-[0.3rem] appearance-none justify-self-end"
      />
      <div className="flex justify-between text-white mt-1">
        <span>{formatTime(progress)}</span>
        <span>{duration ? formatTime(duration) : "??:??"}</span>
      </div> 
    </div>
  );
}

export default ProgressBar;
