import './app.css';

import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Navbar } from '@/components/navbar';
import ArticlePage from '@/pages/article';
import ArticlesPage from '@/pages/articles';
import DomoPage from '@/pages/domo';
import { Redirect } from '@/pages/domo/_components';
import GalleryPage from '@/pages/gallery';
import PhotoPage from '@/pages/photo';
import { Notifications } from '@horen/notifications';

import { store } from './store';
import { getLocalUser } from './utils/store';

const ITEMS = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Gallery',
    to: '/gallery',
  },
  {
    title: 'Article',
    to: '/articles',
  },
];

export default function App() {
  useEffect(() => {
    const user = getLocalUser();
    if (user) store.setState({ user });
  }, []);

  return (
    <React.StrictMode>
      <HashRouter>
        <Navbar menus={ITEMS} />
        <Notifications />
        <Routes>
          <Route path="/" element={<Redirect to="gallery" />} />
          <Route path="domo/*" element={<DomoPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="photo/:uid" element={<PhotoPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="article/:uid" element={<ArticlePage />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}
