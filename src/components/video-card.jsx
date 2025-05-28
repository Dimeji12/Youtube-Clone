
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatTimeAgo, formatDuration, formatViews } from '@/lib/format';

const VideoCard = ({ video, layout = "grid" }) => {
  const isRow = layout === "row";

  return (
    <motion.div 
      className={`video-card group ${isRow ? 'flex gap-4' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link 
        to={`/video/${video.id}`} 
        className={`relative block overflow-hidden rounded-xl ${isRow ? 'w-40 h-24 sm:w-60 sm:h-32' : 'w-full aspect-video'}`}
      >
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="video-thumbnail w-full h-full object-cover transition-transform duration-300"
        />
        <div className="video-duration">{formatDuration(video.duration)}</div>
        <div className="video-progress">
          <div className="video-progress-bar" style={{ width: `${video.progress || 0}%` }}></div>
        </div>
      </Link>
      
      <div className={`flex ${isRow ? 'flex-col' : 'mt-3 gap-3'}`}>
        {!isRow && (
          <Link to={`/channel/${video.channelId}`} className="shrink-0">
            <Avatar className="h-9 w-9">
              <AvatarImage src={video.channelAvatar} alt={video.channelTitle} />
              <AvatarFallback>{video.channelTitle.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        )}
        
        <div className="flex-1 min-w-0">
          <Link to={`/video/${video.id}`} className="block">
            <h3 className={`font-medium line-clamp-2 ${isRow ? 'text-sm' : 'text-base'}`}>{video.title}</h3>
          </Link>
          
          <Link to={`/channel/${video.channelId}`} className="block mt-1 text-sm text-muted-foreground hover:text-foreground">
            {video.channelTitle}
          </Link>
          
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            <span>{formatViews(video.views)} views</span>
            <span className="mx-1">•</span>
            <span>{formatTimeAgo(video.publishedAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
