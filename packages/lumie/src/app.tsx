import './app.css';

import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { Navbar } from '@/components/navbar';
import ArticlesPage from '@/pages/articles';
import ArticlePage from '@/pages/articles/article';
import DomoPage from '@/pages/domo';
import { Redirect } from '@/pages/domo/_components';
import GalleryPage from '@/pages/gallery';
import { Notifications } from '@horen/notifications';

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
          <Route path='gallery' element={<GalleryPage />} />
          <Route path='articles' element={<ArticlesPage />} />
          <Route path='article/:uid' element={<ArticlePage />} />
        </Routes>
      </HashRouter>
    </React.StrictMode>
  );
}
