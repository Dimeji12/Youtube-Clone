
/**
 * Format a number of seconds into a time duration string (MM:SS or HH:MM:SS)
 */
export function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format a date string into a relative time string (e.g., "3 days ago")
 */
export function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  // Time intervals in seconds
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };
  
  if (seconds < 60) {
    return 'just now';
  }
  
  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    
    if (interval >= 1) {
      return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
    }
  }
}

/**
 * Format a number of views with appropriate suffixes (K, M, B)
 */
export function formatViews(views) {
  if (views >= 1000000000) {
    return (views / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  
  if (views >= 1000) {
    return (views / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  
  return views.toString();
}
