
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Share, Download, Flag, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import VideoPlayer from '@/components/video-player';
import VideoCard from '@/components/video-card';
import CommentSection from '@/components/comment-section';
import { formatViews, formatTimeAgo } from '@/lib/format';
import { useVideo } from '@/context/video-context';
import { useToast } from '@/components/ui/use-toast';

const VideoPage = () => {
  const { id } = useParams();
  const { getVideoById, getRelatedVideos, isVideoLiked, toggleLikeVideo } = useVideo();
  const { toast } = useToast();
  const video = getVideoById(id);
  const relatedVideos = getRelatedVideos(id);
  
  useEffect(() => {
    // Scroll to top when video changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!video) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Video not found</p>
      </div>
    );
  }
  
  const handleLikeClick = () => {
    toggleLikeVideo(id);
    
    toast({
      title: isVideoLiked(id) ? "Video unliked" : "Video liked",
      description: isVideoLiked(id) 
        ? "This video has been removed from your liked videos." 
        : "This video has been added to your liked videos.",
    });
  };
  
  const handleShareClick = () => {
    navigator.clipboard.writeText(`https://youtube.com/watch?v=${id}`);
    
    toast({
      title: "Link copied",
      description: "Video link has been copied to clipboard.",
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-2/3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <VideoPlayer videoId={id} />
          
          <div className="mt-4">
            <h1 className="text-xl font-bold">{video.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={video.channelAvatar} alt={video.channelTitle} />
                  <AvatarFallback>{video.channelTitle.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="font-medium">{video.channelTitle}</h3>
                  <p className="text-sm text-muted-foreground">1.2M subscribers</p>
                </div>
                
                <Button className="ml-4" variant="secondary">Subscribe</Button>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex rounded-full bg-secondary overflow-hidden">
                  <Button 
                    variant="ghost" 
                    className={`rounded-r-none ${isVideoLiked(id) ? 'text-primary' : ''}`}
                    onClick={handleLikeClick}
                  >
                    <ThumbsUp className="h-5 w-5 mr-2" />
                    {formatViews(video.likes)}
                  </Button>
                  <div className="w-px bg-border"></div>
                  <Button variant="ghost" className="rounded-l-none">
                    <ThumbsDown className="h-5 w-5" />
                  </Button>
                </div>
                
                <Button variant="secondary" onClick={handleShareClick}>
                  <Share className="h-5 w-5 mr-2" />
                  Share
                </Button>
                
                <Button variant="secondary">
                  <Download className="h-5 w-5 mr-2" />
                  Download
                </Button>
                
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="mt-4 bg-secondary/50 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <span>{formatViews(video.views)} views</span>
                <span>•</span>
                <span>{formatTimeAgo(video.publishedAt)}</span>
              </div>
              
              <p className="mt-2 whitespace-pre-line">{video.description}</p>
            </div>
          </div>
          
          <CommentSection videoId={id} />
        </motion.div>
      </div>
      
      <div className="lg:w-1/3">
        <h2 className="text-lg font-semibold mb-4">Related Videos</h2>
        
        <div className="space-y-4">
          {relatedVideos.map((video) => (
            <VideoCard key={video.id} video={video} layout="row" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
