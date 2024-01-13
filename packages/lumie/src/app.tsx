import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { Notifications } from '@horen/notifications';

import { Navbar } from '@/components/navbar';
import DomoPage from '@/pages/domo';
import GalleryPage from '@/pages/gallery';
import ArticlePage from '@/pages/posts';
import AdminPage from '@/pages/admin';
import { Redirect } from '@/pages/domo/_components';
import './app.css';

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
]

export default function App() {
  return (
    <React.StrictMode>
      <HashRouter>
        <Navbar menus={ITEMS} />
        <Notifications />
        <Routes>
          <Route path='/' element={<Redirect to='gallery' />} />
          <Route path='domo/*' element={<DomoPage />} />
          <Route path='admin/*' element={<AdminPage />} />
          <Route path='gallery' element={<GalleryPage />} />
          <Route path='articles' element={<ArticlePage />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}
