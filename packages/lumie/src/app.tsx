import React from 'react';
import { HashRouter } from 'react-router-dom';
import { RootRouter } from '@/routes';
import { Navbar } from './components/navbar';

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
  {
    title: 'Admin',
    to: '/admin',
  },
  {
    title: 'Mobile',
    to: '/mobile'
  }
]

export default function App() {
  return (
    <React.StrictMode>
      <HashRouter>
        <RootRouter />
        <Navbar menus={ITEMS} />
      </HashRouter>
    </React.StrictMode>
  );
}
