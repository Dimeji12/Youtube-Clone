import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { formatDuration } from '@/lib/format';
import { useVideo } from '@/context/video-context';

const VideoPlayer = ({ videoId }) => {
  const iframeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlsTimeoutRef = useRef(null);
  const { updateWatchHistory, getVideoById } = useVideo();
  const videoData = getVideoById(videoId);


  useEffect(() => {
    if (videoData) {
      setDuration(videoData.duration);
    }
  }, [videoData]);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'f') {
        toggleFullscreen();
      } else if (e.key === 'm') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted]);

  const togglePlay = () => {
    const player = iframeRef.current;
    if (player && player.contentWindow) {
      const command = isPlaying ? 'pauseVideo' : 'playVideo';
      player.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
      setIsPlaying(!isPlaying);
      if (!isPlaying && duration > 0) {
         updateWatchHistory(videoId, (currentTime / duration) * 100);
      }
    }
  };

  const toggleMute = () => {
    const player = iframeRef.current;
    if (player && player.contentWindow) {
      const command = isMuted ? 'unMute' : 'mute';
      player.contentWindow.postMessage(`{"event":"command","func":"${command}","args":""}`, '*');
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    const videoContainer = document.getElementById('video-container-main');
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    const player = iframeRef.current;
    if (player && player.contentWindow) {
      player.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${newVolume * 100}]}`, '*');
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const handleSeek = (value) => {
    const newTime = (value[0] / 100) * duration;
    const player = iframeRef.current;
    if (player && player.contentWindow) {
       player.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${newTime}, true]}`, '*');
       setCurrentTime(newTime);
       updateWatchHistory(videoId, value[0]);
    }
  };
  
  const skip = (seconds) => {
    const newTime = Math.min(Math.max(currentTime + seconds, 0), duration);
    const player = iframeRef.current;
    if (player && player.contentWindow) {
      player.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${newTime}, true]}`, '*');
      setCurrentTime(newTime);
      updateWatchHistory(videoId, (newTime / duration) * 100);
    }
  };


  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };
  
  useEffect(() => {
    const onPlayerStateChange = (event) => {
      if (event.data && typeof event.data === 'string') {
        try {
          const jsonData = JSON.parse(event.data);
          if (jsonData.event === 'infoDelivery' && jsonData.info && typeof jsonData.info.currentTime === 'number') {
            setCurrentTime(jsonData.info.currentTime);
            if (jsonData.info.playerState === 1 && duration > 0) { // Playing
                 updateWatchHistory(videoId, (jsonData.info.currentTime / duration) * 100);
            }
          }
          if (jsonData.event === 'infoDelivery' && jsonData.info && typeof jsonData.info.duration === 'number') {
            setDuration(jsonData.info.duration);
          }
           if (jsonData.event === 'infoDelivery' && jsonData.info && typeof jsonData.info.playerState === 'number') {
            if (jsonData.info.playerState === 1) setIsPlaying(true); // Playing
            if (jsonData.info.playerState === 2) setIsPlaying(false); // Paused
            if (jsonData.info.playerState === 0) setIsPlaying(false); // Ended
          }
        } catch (e) {
          // console.error("Error parsing YouTube iframe message:", e);
        }
      }
    };

    window.addEventListener('message', onPlayerStateChange);
    return () => window.removeEventListener('message', onPlayerStateChange);
  }, [videoId, updateWatchHistory, duration]);


  return (
    <motion.div
      id="video-container-main"
      className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <iframe
        ref={iframeRef}
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=0&controls=0&modestbranding=1&rel=0`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>

      <div 
        className={`absolute inset-0 w-full h-full cursor-pointer ${isFullscreen ? '' : 'pointer-events-none'}`}
        onClick={!isFullscreen ? togglePlay : undefined} 
      ></div>

      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="mb-2">
          <Slider
            value={[duration ? (currentTime / duration) * 100 : 0]}
            max={100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={togglePlay} className="p-1 rounded-full hover:bg-white/20">
              {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
            </button>
            
            <button onClick={() => skip(-10)} className="p-1 rounded-full hover:bg-white/20">
              <SkipBack className="h-5 w-5 text-white" />
            </button>
            
            <button onClick={() => skip(10)} className="p-1 rounded-full hover:bg-white/20">
              <SkipForward className="h-5 w-5 text-white" />
            </button>
            
            <div className="flex items-center gap-2 ml-2">
              <button onClick={toggleMute} className="p-1 rounded-full hover:bg-white/20">
                {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
              </button>
              
              <div className="w-20">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
            
            <div className="text-white text-xs ml-2">
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </div>
          </div>
          
          <div>
            <button onClick={toggleFullscreen} className="p-1 rounded-full hover:bg-white/20">
              <Maximize className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
          <motion.div
            className="bg-white/20 backdrop-blur-sm rounded-full p-6 pointer-events-auto"
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Play className="h-12 w-12 text-white" />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default VideoPlayer;