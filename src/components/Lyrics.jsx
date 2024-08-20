import { useState, useEffect, useRef } from "react";
import usePlayer from "../contexts/player";
import { parseLRC } from "../utils/parseLRC";

const Lyrics = () => {
  const { player, lyrics, synced, isPlaying, simulatedProgress, setSimulatedProgress } = usePlayer();
  const { error, progress, duration } = player || {};
  const [currentLineIndex, setCurrentLineIndex] = useState(null);
  const [loadingText, setLoadingText] = useState("Loading");

  const lyricsContainerRef = useRef(null);
  const lineRefs = useRef([]);

  const getCurrentLineIndex = (progress) => {
    if (!synced || !lyrics) return null;

    const parsedLyrics = parseLRC(lyrics);
    if (!parsedLyrics.length) return null;

    // Find the index of the current line based on progress
    return parsedLyrics.findIndex(line => line.timestamp > progress) - 1;
  };

  // Update current line index when simulated progress changes
  useEffect(() => {
    setCurrentLineIndex(getCurrentLineIndex(simulatedProgress));
  }, [simulatedProgress, synced, lyrics]);

  useEffect(() => {
    // Sync simulatedProgress with player progress
    setSimulatedProgress(progress || 0);

    const intervalId = setInterval(() => {
      if (isPlaying) {
        setSimulatedProgress(prev => Math.min(prev + 1, duration)); // Simulating progress client-side
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isPlaying, progress]);

  // Loading Animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText(prev => {
        if (prev === "Loading...") return "Loading";
        if (prev === "Loading") return "Loading.";
        if (prev === "Loading.") return "Loading..";
        if (prev === "Loading..") return "Loading...";
        return "Loading";
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Scroll to the current line and center it within the container
    if (lyricsContainerRef.current && currentLineIndex !== null) {
      const currentLineElement = lineRefs.current[currentLineIndex];
      if (currentLineElement) {
        const container = lyricsContainerRef.current;
        const containerHeight = container.clientHeight;
        const lineTop = currentLineElement.offsetTop;
        const lineHeight = currentLineElement.clientHeight;
        const scrollTop = lineTop - (containerHeight / 2) + (lineHeight / 2);

        container.scrollTo({
          top: scrollTop,
          behavior: 'smooth'
        });
      }
    }
  }, [currentLineIndex]);

  const renderLyrics = () => {
    if (!lyrics) {
      return <span>{loadingText}</span>;
    }
    if (synced) {
      // Render LRC lyrics with the current line highlighted
      const parsedLyrics = parseLRC(lyrics);
      return parsedLyrics.map((line, index) => (
        <p
          key={index}
          ref={el => lineRefs.current[index] = el}
          className={`transition-all duration-150 ease-in-out ${index === currentLineIndex ? 'md:text-5xl text-3xl py-5' : 'opacity-60'}`}
        >
          {line.text}
        </p>
      ));
    } else {
      // Plain Lyrics
      return <p>{lyrics || "Loading..."}</p>;
    }
  };

  return (
    <div ref={lyricsContainerRef} className="pt-4 overflow-y-auto h-[calc(100%-3.5rem)] px-4 text-center">
      <pre className="text-white font-palanquin md:text-3xl text-xl whitespace-pre-line">
        {error ? <p>{error}</p> : renderLyrics()}
      </pre>
      <br />
      <br />
    </div>
  );
};

export default Lyrics;