
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import { formatTimeAgo } from '@/lib/format';
import { useVideo } from '@/context/video-context';
import { useToast } from '@/components/ui/use-toast';

const CommentSection = ({ videoId }) => {
  const [newComment, setNewComment] = useState('');
  const { getComments, addComment } = useVideo();
  const { toast } = useToast();
  const comments = getComments(videoId);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    addComment(videoId, newComment);
    setNewComment('');
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted successfully.",
    });
  };

  return (
    <motion.div 
      className="mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <h3 className="font-semibold text-lg mb-4">{comments.length} Comments</h3>
      
      {/* Add comment form */}
      <form onSubmit={handleSubmitComment} className="flex gap-4 mb-6">
        <Avatar className="h-10 w-10">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-2"
          />
          
          <div className="flex justify-end mt-2 gap-2">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setNewComment('')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!newComment.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
      </form>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div 
            key={comment.id} 
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.userAvatar} alt={comment.userName} />
              <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{comment.userName}</span>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(comment.timestamp)}</span>
              </div>
              
              <p className="mt-1">{comment.text}</p>
              
              <div className="flex items-center gap-4 mt-2">
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{comment.likes}</span>
                </button>
                
                <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ThumbsDown className="h-4 w-4" />
                </button>
                
                <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Reply
                </button>
              </div>
              
              {comment.replies && comment.replies.length > 0 && (
                <button className="text-sm text-primary font-medium mt-2">
                  View {comment.replies.length} replies
                </button>
              )}
            </div>
            
            <button className="text-muted-foreground hover:text-foreground">
              <MoreVertical className="h-5 w-5" />
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CommentSection;
