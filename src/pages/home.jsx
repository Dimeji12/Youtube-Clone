
import React from 'react';
import { motion } from 'framer-motion';
import VideoCard from '@/components/video-card';
import { useVideo } from '@/context/video-context';

const HomePage = () => {
  const { getAllVideos } = useVideo();
  const videos = getAllVideos();

  return (
    <div>
      <motion.h1 
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Recommended
      </motion.h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
