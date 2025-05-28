
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockVideos, mockComments } from '@/data/mock-data';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState({});
  const [watchHistory, setWatchHistory] = useState({});
  const [likedVideos, setLikedVideos] = useState([]);
  
  // Initialize data from localStorage or use mock data
  useEffect(() => {
    const storedVideos = localStorage.getItem('youtube-clone-videos');
    const storedComments = localStorage.getItem('youtube-clone-comments');
    const storedWatchHistory = localStorage.getItem('youtube-clone-watch-history');
    const storedLikedVideos = localStorage.getItem('youtube-clone-liked-videos');
    
    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    } else {
      setVideos(mockVideos);
      localStorage.setItem('youtube-clone-videos', JSON.stringify(mockVideos));
    }
    
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else {
      setComments(mockComments);
      localStorage.setItem('youtube-clone-comments', JSON.stringify(mockComments));
    }
    
    if (storedWatchHistory) {
      setWatchHistory(JSON.parse(storedWatchHistory));
    }
    
    if (storedLikedVideos) {
      setLikedVideos(JSON.parse(storedLikedVideos));
    }
  }, []);
  
  // Save data to localStorage when it changes
  useEffect(() => {
    if (videos.length > 0) {
      localStorage.setItem('youtube-clone-videos', JSON.stringify(videos));
    }
  }, [videos]);
  
  useEffect(() => {
    if (Object.keys(comments).length > 0) {
      localStorage.setItem('youtube-clone-comments', JSON.stringify(comments));
    }
  }, [comments]);
  
  useEffect(() => {
    if (Object.keys(watchHistory).length > 0) {
      localStorage.setItem('youtube-clone-watch-history', JSON.stringify(watchHistory));
    }
  }, [watchHistory]);
  
  useEffect(() => {
    if (likedVideos.length > 0) {
      localStorage.setItem('youtube-clone-liked-videos', JSON.stringify(likedVideos));
    }
  }, [likedVideos]);
  
  // Video functions
  const getAllVideos = () => {
    return videos.map(video => ({
      ...video,
      progress: watchHistory[video.id]?.progress || 0
    }));
  };
  
  const getVideoById = (id) => {
    const video = videos.find(v => v.id === id);
    if (video) {
      return {
        ...video,
        progress: watchHistory[id]?.progress || 0
      };
    }
    return null;
  };
  
  const getRelatedVideos = (id, limit = 10) => {
    return videos
      .filter(v => v.id !== id)
      .sort(() => 0.5 - Math.random())
      .slice(0, limit)
      .map(video => ({
        ...video,
        progress: watchHistory[video.id]?.progress || 0
      }));
  };
  
  const searchVideos = (query) => {
    const searchTerms = query.toLowerCase().split(' ');
    return videos
      .filter(video => {
        const titleLower = video.title.toLowerCase();
        const descriptionLower = video.description.toLowerCase();
        const channelLower = video.channelTitle.toLowerCase();
        
        return searchTerms.some(term => 
          titleLower.includes(term) || 
          descriptionLower.includes(term) || 
          channelLower.includes(term)
        );
      })
      .map(video => ({
        ...video,
        progress: watchHistory[video.id]?.progress || 0
      }));
  };
  
  // Comment functions
  const getComments = (videoId) => {
    return comments[videoId] || [];
  };
  
  const addComment = (videoId, text) => {
    const newComment = {
      id: Date.now().toString(),
      videoId,
      userName: 'Current User',
      userAvatar: '',
      text,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    
    const updatedComments = {
      ...comments,
      [videoId]: [newComment, ...(comments[videoId] || [])]
    };
    
    setComments(updatedComments);
  };
  
  // Watch history functions
  const updateWatchHistory = (videoId, progress) => {
    setWatchHistory(prev => ({
      ...prev,
      [videoId]: {
        lastWatched: new Date().toISOString(),
        progress
      }
    }));
  };
  
  // Like functions
  const toggleLikeVideo = (videoId) => {
    if (likedVideos.includes(videoId)) {
      setLikedVideos(prev => prev.filter(id => id !== videoId));
    } else {
      setLikedVideos(prev => [...prev, videoId]);
    }
  };
  
  const isVideoLiked = (videoId) => {
    return likedVideos.includes(videoId);
  };
  
  const value = {
    getAllVideos,
    getVideoById,
    getRelatedVideos,
    searchVideos,
    getComments,
    addComment,
    updateWatchHistory,
    toggleLikeVideo,
    isVideoLiked
  };
  
  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};
