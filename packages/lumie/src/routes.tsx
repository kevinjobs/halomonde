import React from 'react';
import { useRoutes } from 'react-router-dom';

const AdminPage = React.lazy(() => import('@/pages/admin'));
const ArticlePage = React.lazy(() => import('@/pages/posts/post'));
const ArticlesPage = React.lazy(() => import('@/pages/posts'));
const GalleryPage = React.lazy(() => import('@/pages/gallery'));

const PostsAdmin = React.lazy(() => import('./pages/admin/posts'));
const HomeAdmin = React.lazy(() => import('./pages/admin/home'));
const CoverAdmin = React.lazy(() => import('./pages/admin/cover'));
const UserAdmin = React.lazy(() => import('./pages/admin/users'));
const EditPage = React.lazy(() => import('@/pages/admin/edit'));

const MobileAdmin = React.lazy(() => import('@/pages/mobile'));
const MobilePhoto = React.lazy(() => import('./pages/mobile/photo'));
const MobilePhotos = React.lazy(() => import('./pages/mobile/photos'));
const MobileArticles = React.lazy(() => import('./pages/mobile/articles'));
const MobileUsers = React.lazy(() => import('./pages/mobile/users'));
const MobileLogin = React.lazy(() => import('./pages/mobile/login'));
const MobileProfile = React.lazy(() => import('./pages/mobile/profile'));

export const RootRouter = () => useRoutes(
  [
    {
      path: '/',
      element: <React.Suspense><GalleryPage /></React.Suspense>
    },
    {
      path: 'mobile',
      element: <React.Suspense><MobileAdmin /></React.Suspense>,
      children: [
        {
          path: 'photo/:uid',
          element: <React.Suspense><MobilePhoto /></React.Suspense>
        },
        {
          path: 'photos',
          element: <React.Suspense><MobilePhotos /></React.Suspense>
        },
        {
          path: 'articles',
          element: <React.Suspense><MobileArticles /></React.Suspense>
        },
        {
          path: 'users',
          element: <React.Suspense><MobileUsers /></React.Suspense>
        },
        {
          path: 'login',
          element: <React.Suspense><MobileLogin /></React.Suspense>
        },
        {
          path: 'profile/:username',
          element: <React.Suspense><MobileProfile /></React.Suspense>
        }
      ]
    },
    {
      path: 'admin',
      element: <React.Suspense><AdminPage /></React.Suspense>,
      children: [
        {
          path: 'post',
          element: <React.Suspense><PostsAdmin /></React.Suspense>
        },
        {
          path: 'home',
          element: <React.Suspense><HomeAdmin /></React.Suspense>
        },
        {
          path: 'cover',
          element: <React.Suspense><CoverAdmin /></React.Suspense>
        },
        {
          path: 'user',
          element: <React.Suspense><UserAdmin /></React.Suspense>
        },
        {
          path: 'edit/:mode/:typ/:uid',
          element: <React.Suspense><EditPage /></React.Suspense>,
        }
      ]
    },
    {
      path: 'article/:uid',
      element: <React.Suspense><ArticlePage /></React.Suspense>,
    },
    {
      path: 'articles',
      element: <React.Suspense><ArticlesPage /></React.Suspense>,
    },
    {
      path: 'gallery',
      element: <React.Suspense><GalleryPage /></React.Suspense>,
    },
  ]
);
