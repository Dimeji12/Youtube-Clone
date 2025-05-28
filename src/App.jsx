
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout';
import HomePage from '@/pages/home';
import VideoPage from '@/pages/video';
import SearchPage from '@/pages/search';
import { VideoProvider } from '@/context/video-context';

function App() {
  return (
    <VideoProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Layout>
      <Toaster />
    </VideoProvider>
  );
}

export default App;
