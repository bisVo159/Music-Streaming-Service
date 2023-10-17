// import React, { useState, useRef, useEffect } from "react";
// import "./audioPlayer.css";
// import Controls from "./controls";
// import ProgressCircle from "./progressCircle";
// import WaveAnimation from "./waveAnimation";

// export default function AudioPLayer({
//   currentTrack,
//   currentIndex,
//   setCurrentIndex,
//   total,
// }) {

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [trackProgress, setTrackProgress] = useState(0);
//   const audioSrc = total[currentIndex]?.new_artist;

//   const audioRef = useRef(new Audio(audioSrc));
//   const intervalRef = useRef();
//   const isReady = useRef(false);

//   const { duration } = audioRef.current;
//   const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;
//   console.log("tracks -> ",total)
//   console.log("currentTrack ",currentTrack)

//   const startTimer = () => {
//     clearInterval(intervalRef.current);
//     intervalRef.current = setInterval(() => {
//       if (audioRef.current.ended) {
//         handleNext();
//       } else {
//         setTrackProgress(audioRef.current.currentTime);
//       }
//     }, 1000);
//   };

//   useEffect(() => {
//     audioRef.current.src = audioSrc; // Set the source when it changes

//     if (isReady.current) {
//       if (isPlaying) {
//         audioRef.current.play();
//         startTimer();
//       } else {
//         audioRef.current.pause();
//         clearInterval(intervalRef.current);
//       }
//     } else {
//       isReady.current = true;
//     }

//     return () => {
//       audioRef.current.pause();
//       clearInterval(intervalRef.current);
//     };
//   }, [isPlaying, audioSrc]);

//   useEffect(() => {
//     // Handle track change
//     audioRef.current.pause();
//     audioRef.current.currentTime = 0;
//     setTrackProgress(0);

//     if (isPlaying) {
//       audioRef.current.play();
//       startTimer();
//     }
//   }, [currentIndex]);

//   const handleNext = () => {
//     if (currentIndex < total.length - 1) {
//     // if (currentIndex < 3 - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       setCurrentIndex(0);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex - 1 < 0) {
//       setCurrentIndex(total.length - 1);
//       // setCurrentIndex(3 - 1);
//     } else {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const addZero = (n) => {
//     return n > 9 ? "" + n : "0" + n;
//   };

//   // const artists = [];
//   // currentTrack?.album?.artists.forEach((artist) => {
//   //   artists.push(artist.name);
//   // });
//   return (
//     <div className="player-body flex">
//       <div className="player-left-body">
//         <ProgressCircle
//           percentage={currentPercentage}
//           isPlaying={true}
//           image={currentTrack?.url}
//           size={300}
//           color="#C96850"
//         />
//       </div>
//       <div className="player-right-body flex">
//         <p className="song-title">{currentTrack?.Title}</p>
//         <p className="song-artist">{currentTrack?.thumbnail}</p>
//         <div className="player-right-bottom flex">
//           <div className="song-duration flex">
//             <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
//             <WaveAnimation isPlaying={isPlaying} />
//             <p className="duration">0:{currentTrack?.DurationInSeconds}</p>
//           </div>
//           <Controls
//             isPlaying={isPlaying}
//             setIsPlaying={setIsPlaying}
//             handleNext={handleNext}
//             handlePrev={handlePrev}
//             total={total}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useRef, useEffect } from "react";
import "./audioPlayer.css";
import Controls from "./controls";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";

export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const audioSrc = total[currentIndex]?.new_artist;

  const audioRef = useRef(new Audio());
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  useEffect(() => {
    if (!audioSrc) return; // Audio source not available

    setIsLoading(true); // Set loading state
    audioRef.current.src = audioSrc; // Set the source when it changes
    audioRef.current.volume = 1;

    audioRef.current.oncanplaythrough = () => {
      setIsLoading(false); // Audio is ready
      if (isReady.current) {
        if (isPlaying) {
          audioRef.current.play().catch(error => {
            console.error("Play error:", error);
          });
          startTimer();
        }
      } else {
        isReady.current = true;
      }
    };

    audioRef.current.onerror = (error) => {
      console.error("Audio loading error:", error);
      setIsLoading(false);
      // Handle audio loading errors here
    };

    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, [isPlaying, audioSrc]);

  useEffect(() => {
    // Handle track change
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setTrackProgress(0);
    setIsLoading(true); // Set loading state for the new track

    if (isPlaying) {
      audioRef.current.play().catch(error => {
        console.error("Play error:", error);
      });
      startTimer();
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(total.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.round(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ProgressCircle
            percentage={currentPercentage}
            isPlaying={true}
            image={currentTrack?.url}
            size={300}
            color="#C96850"
          />
        )}
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.Title}</p>
        <p className="song-artist">{currentTrack?.thumbnail}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{formatDuration(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:{formatDuration(duration)}</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
