import { useState, useEffect, useRef } from "react";
import usePlayer from "../contexts/player";

const Lyrics = () => {
  const { player, lyrics, parsedLyrics, synced, isPlaying, simulatedProgress, setSimulatedProgress } = usePlayer();
  const { error, progress, duration, cover_art } = player || {};
  const [currentLineIndex, setCurrentLineIndex] = useState(null);
  const [loadingText, setLoadingText] = useState("Loading...");
  const [isPiP, setIsPiP] = useState(false);

  const lyricsContainerRef = useRef(null);
  const lineRefs = useRef([]);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const getCurrentLineIndex = (progress) => {
    if (!synced || parsedLyrics.length === 0) return null;
    return parsedLyrics.findIndex(line => line.timestamp > progress) - 1;
  };

  useEffect(() => {
    setCurrentLineIndex(getCurrentLineIndex(simulatedProgress));
  }, [simulatedProgress, synced, parsedLyrics]);

  useEffect(() => {
    setSimulatedProgress(progress || 0);
    const intervalId = setInterval(() => {
      if (isPlaying) {
        setSimulatedProgress(prev => Math.min(prev + 1, duration));
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [isPlaying, progress]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText(prev => {
        switch (prev) {
          case "Loading...": return "Loading";
          case "Loading": return "Loading.";
          case "Loading.": return "Loading..";
          case "Loading..": return "Loading...";
          default: return "Loading";
        }
      });
    }, 500);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (lyricsContainerRef.current && currentLineIndex !== null) {
      const currentLineElement = lineRefs.current[currentLineIndex];
      if (currentLineElement) {
        const container = lyricsContainerRef.current;
        const containerHeight = container.clientHeight;
        const lineTop = currentLineElement.offsetTop;
        const lineHeight = currentLineElement.clientHeight;
        const scrollTop = lineTop - (containerHeight / 2) + (lineHeight / 2);
        container.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }
    }
  }, [currentLineIndex]);

  const drawWrappedText = (ctx, text, x, y, maxWidth) => {
    const words = text.split(' ');
    let line = '';
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + ' ';
        y += 40; // Move down for the next line (adjust based on font size)
      } else {
        line = testLine;
      }
    }
    
    ctx.fillText(line, x, y); // Draw the last line
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const drawLyrics = () => {
      if (!cover_art) return; // Ensure there's a cover art before drawing
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      var background = new Image();
      background.crossOrigin = "anonymous"; // Set CORS
      background.src = cover_art;
  
      background.onload = function() {
          // Set the filter for blur
          ctx.filter = "blur(5px)"; // Adjust blur value as needed
  
          // Calculate the aspect ratio
          const aspectRatio = background.width / background.height;
          let drawWidth, drawHeight;
  
          // Calculate dimensions to maintain aspect ratio
          if (canvas.width / canvas.height > aspectRatio) {
              // Canvas is wider than the image aspect ratio
              drawWidth = canvas.width;
              drawHeight = canvas.width / aspectRatio;
          } else {
              // Canvas is taller than the image aspect ratio
              drawHeight = canvas.height;
              drawWidth = canvas.height * aspectRatio;
          }
  
          // Calculate position to center the image
          const x = (canvas.width - drawWidth) / 2;
          const y = (canvas.height - drawHeight) / 2;
  
          // Draw the background image
          ctx.drawImage(background, x, y, drawWidth, drawHeight);
          
          // Reset the filter to default
          ctx.filter = "none"; 

          ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.font = "40px Palanquin";
          ctx.textAlign = "center";
  
          const linePadding = 100; // Padding between lines
          const baseY = canvas.height / 2; // Center position for current line
  
          // Previous line
          ctx.fillStyle = "gray"; // Gray color for previous line
          const previousLine = parsedLyrics[currentLineIndex - 1] ? parsedLyrics[currentLineIndex - 1].text : "";
          drawWrappedText(ctx, previousLine, canvas.width / 2, baseY - linePadding, canvas.width - 20);
  
          // Current line
          ctx.fillStyle = "white"; // White color for current line
          const currentLine = parsedLyrics[currentLineIndex] ? parsedLyrics[currentLineIndex].text : "";
          drawWrappedText(ctx, currentLine, canvas.width / 2, baseY, canvas.width - 20);
  
          // Next line
          ctx.fillStyle = "gray"; // Gray color for next line
          const nextLine = parsedLyrics[currentLineIndex + 1] ? parsedLyrics[currentLineIndex + 1].text : "";
          drawWrappedText(ctx, nextLine, canvas.width / 2, baseY + linePadding, canvas.width - 20);
      };
    };
  

    if (currentLineIndex !== null) {
      drawLyrics();
      const stream = canvas.captureStream();
      videoRef.current.srcObject = stream;
    }
  }, [currentLineIndex, parsedLyrics]);

  const togglePiP = async () => {
    if (isPiP) {
      document.exitPictureInPicture();
    } else {
      await videoRef.current.requestPictureInPicture();
    }
  };

  useEffect(() => {
    const handlePiPExit = () => {
      setIsPiP(false);
    };

    const handlePiPEnter = () => {
      setIsPiP(true);
    };

    const videoElement = videoRef.current;

    videoElement.addEventListener("enterpictureinpicture", handlePiPEnter);
    document.addEventListener("leavepictureinpicture", handlePiPExit);

    return () => {
      videoElement.removeEventListener("enterpictureinpicture", handlePiPEnter);
      document.removeEventListener("leavepictureinpicture", handlePiPExit);
    };
  }, []);

  const renderLyrics = () => {
    if (error) {
      return <p>{error}</p>;
    }

    if (!synced) {
      return <p>{lyrics.length > 0 ? lyrics : "No Lyrics Found"}</p>;
    }

    if (parsedLyrics.length === 0) {
      return <span>{loadingText}</span>;
    }

    return parsedLyrics.map((line, index) => (
      <p
        key={index}
        ref={el => lineRefs.current[index] = el}
        className={`transition-all duration-150 ease-in-out ${index === currentLineIndex ? 'md:text-5xl text-3xl py-5' : 'opacity-60'}`}
      >
        {line.text}
      </p>
    ));
  };

  return (
    <>
    <div ref={lyricsContainerRef} className="pt-4 overflow-y-auto h-[calc(100%-3.5rem)] px-4 text-center relative">
      <pre className="text-white font-palanquin md:text-3xl text-xl whitespace-pre-line">
        {error ? <p>{error}</p> : renderLyrics()}
      </pre>
      <br />
      <br />
      <canvas ref={canvasRef} width={640} height={360} style={{display: 'none'}}/>
      <video ref={videoRef} autoPlay style={{display: 'none'}}/>
    </div>
    <button 
    onClick={togglePiP}
    className="absolute bottom-5 right-8 px-4 py-2 bg-black text-white rounded
              transition duration-150 ease-in-out
              transform hover:scale-110"
    >
      Toggle PiP
    </button>
    </>
  );
};

export default Lyrics;
