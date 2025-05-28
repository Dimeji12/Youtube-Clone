import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, Compass, Bookmark, Clock, ThumbsUp,
  Film, Music, Gamepad2, Trophy, Flame,
  ShoppingBag, Lightbulb, Newspaper
} from 'lucide-react';

const Sidebar = ({ isOpen = true, isHiddenOnVideoPage = false }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  if (!isOpen || isHiddenOnVideoPage) return null;

  return (
    <aside className="w-64 overflow-y-auto border-r shrink-0 block">
      <div className="py-2">
        <div className="px-3 py-2">
          <h2 className="font-semibold mb-2">Main</h2>
          <nav className="space-y-1">
            <SidebarLink to="/" icon={Home} label="Home" active={isActive('/')} />
            <SidebarLink to="/explore" icon={Compass} label="Explore" />
            <SidebarLink to="/subscriptions" icon={Bookmark} label="Subscriptions" />
          </nav>
        </div>

        <div className="border-t my-2"></div>
        <div className="px-3 py-2">
          <h2 className="font-semibold mb-2">Library</h2>
          <nav className="space-y-1">
            <SidebarLink to="/history" icon={Clock} label="History" />
            <SidebarLink to="/liked" icon={ThumbsUp} label="Liked videos" />
          </nav>
        </div>

        <div className="border-t my-2"></div>
        <div className="px-3 py-2">
          <h2 className="font-semibold mb-2">Explore</h2>
          <nav className="space-y-1">
            <SidebarLink to="/trending" icon={Flame} label="Trending" />
            <SidebarLink to="/music" icon={Music} label="Music" />
            <SidebarLink to="/movies" icon={Film} label="Movies" />
            <SidebarLink to="/gaming" icon={Gamepad2} label="Gaming" />
            <SidebarLink to="/sports" icon={Trophy} label="Sports" />
            <SidebarLink to="/learning" icon={Lightbulb} label="Learning" />
            <SidebarLink to="/news" icon={Newspaper} label="News" />
            <SidebarLink to="/shopping" icon={ShoppingBag} label="Shopping" />
          </nav>
        </div>

        <div className="border-t my-2"></div>
        <div className="px-3 py-2 text-xs text-muted-foreground">
          <div className="flex flex-wrap gap-2 mb-2">
            {['About', 'Press', 'Copyright', 'Contact', 'Creators', 'Advertise', 'Developers'].map((item) => (
              <a key={item} href="#" className="hover:underline">{item}</a>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-2">
            {['Terms', 'Privacy', 'Policy & Safety', 'How YouTube works', 'Test new features'].map((item) => (
              <a key={item} href="#" className="hover:underline">{item}</a>
            ))}
          </div>
          <p className="mt-4">© 2025 YouTube Clone</p>
        </div>
      </div>
    </aside>
  );
};

const SidebarLink = ({ to, icon: Icon, label, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition ${active ? 'bg-gray-200 font-semibold' : ''}`}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </Link>
);

export default Sidebar;
