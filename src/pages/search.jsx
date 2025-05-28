
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import VideoCard from '@/components/video-card';
import { useVideo } from '@/context/video-context';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchVideos } = useVideo();
  const [videos, setVideos] = useState([]);
  
  useEffect(() => {
    if (query) {
      const results = searchVideos(query);
      setVideos(results);
    }
  }, [query, searchVideos]);

  return (
    <div>
      <motion.h1 
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        Search results for "{query}"
      </motion.h1>
      
      {videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No videos found for "{query}"</p>
        </div>
      ) : (
        <div className="space-y-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} layout="row" />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
