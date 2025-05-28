
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Compass, Bookmark, Clock, ThumbsUp, 
  Film, Music, Gamepad2, Trophy, Flame, 
  ShoppingBag, Lightbulb, Newspaper
} from 'lucide-react';

const Sidebar = ({ className = '' }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`w-64 overflow-y-auto border-r shrink-0 ${className}`}>
      <div className="py-2">
        <div className="px-3 py-2">
          <h2 className="font-semibold mb-2">Main</h2>
          <nav>
            <Link to="/" className={`sidebar-item ${isActive('/') ? 'active' : ''}`}>
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/explore" className="sidebar-item">
              <Compass className="h-5 w-5" />
              <span>Explore</span>
            </Link>
            <Link to="/subscriptions" className="sidebar-item">
              <Bookmark className="h-5 w-5" />
              <span>Subscriptions</span>
            </Link>
          </nav>
        </div>

        <div className="border-t my-2"></div>

        <div className="px-3 py-2">
          <h2 className="font-semibold mb-2">Library</h2>
          <nav>
            <Link to="/history" className="sidebar-item">
              <Clock className="h-5 w-5" />
              <span>History</span>
            </Link>
            <Link to="/liked" className="sidebar-item">
              <ThumbsUp className="h-5 w-5" />
              <span>Liked videos</span>
            </Link>
          </nav>
        </div>

        <div className="border-t my-2"></div>

        <div className="px-3 py-2">
          <h2 className="font-semibold mb-2">Explore</h2>
          <nav>
            <Link to="/trending" className="sidebar-item">
              <Flame className="h-5 w-5" />
              <span>Trending</span>
            </Link>
            <Link to="/music" className="sidebar-item">
              <Music className="h-5 w-5" />
              <span>Music</span>
            </Link>
            <Link to="/movies" className="sidebar-item">
              <Film className="h-5 w-5" />
              <span>Movies</span>
            </Link>
            <Link to="/gaming" className="sidebar-item">
              <Gamepad2 className="h-5 w-5" />
              <span>Gaming</span>
            </Link>
            <Link to="/sports" className="sidebar-item">
              <Trophy className="h-5 w-5" />
              <span>Sports</span>
            </Link>
            <Link to="/learning" className="sidebar-item">
              <Lightbulb className="h-5 w-5" />
              <span>Learning</span>
            </Link>
            <Link to="/news" className="sidebar-item">
              <Newspaper className="h-5 w-5" />
              <span>News</span>
            </Link>
            <Link to="/shopping" className="sidebar-item">
              <ShoppingBag className="h-5 w-5" />
              <span>Shopping</span>
            </Link>
          </nav>
        </div>

        <div className="border-t my-2"></div>

        <div className="px-3 py-2 text-xs text-muted-foreground">
          <div className="flex flex-wrap gap-2 mb-2">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Press</a>
            <a href="#" className="hover:underline">Copyright</a>
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="hover:underline">Creators</a>
            <a href="#" className="hover:underline">Advertise</a>
            <a href="#" className="hover:underline">Developers</a>
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Policy & Safety</a>
            <a href="#" className="hover:underline">How YouTube works</a>
            <a href="#" className="hover:underline">Test new features</a>
          </div>
          <p className="mt-4">© 2025 YouTube Clone</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
