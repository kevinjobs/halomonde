import React from 'react';
import { useRoutes } from 'react-router-dom';

const AdminPage = React.lazy(() => import('@/pages/admin'));
const ArticlePage = React.lazy(() => import('@/pages/posts/post'));
const ArticlesPage = React.lazy(() => import('@/pages/posts'));
const GalleryPage = React.lazy(() => import('@/pages/gallery'));
const GoPage = React.lazy(() => import('@/pages/go'));

const PostsAdmin = React.lazy(() => import('./pages/admin/desktop/posts'));
const HomeAdmin = React.lazy(() => import('./pages/admin/desktop/home'));
const CoverAdmin = React.lazy(() => import('./pages/admin/desktop/cover'));
const VerseAdmin = React.lazy(() => import('./pages/admin/desktop/verse'));
const InvitationsAdmin = React.lazy(() => import('./pages/admin/desktop/invitations'));
const UserAdmin = React.lazy(() => import('./pages/admin/desktop/users'));
const EditAdmin = React.lazy(() => import('@/pages/admin/desktop/edit'));
const FileListAdmin = React.lazy(() => import('@/pages/admin/desktop/files'));

const MobileAdmin = React.lazy(() => import('@/pages/admin/mobile'));
const MobilePhoto = React.lazy(() => import('./pages/admin/mobile/photo'));
const MobilePhotos = React.lazy(() => import('./pages/admin/mobile/photos'));
const MobileArticles = React.lazy(() => import('./pages/admin/mobile/articles'));
const MobileUsers = React.lazy(() => import('./pages/admin/mobile/users'));
const MobileLogin = React.lazy(() => import('./pages/admin/mobile/login'));
const MobileProfile = React.lazy(() => import('./pages/admin/mobile/profile'));

const Domo = React.lazy(() => import('./pages/domo'));
const DomoHome = React.lazy(() => import('./pages/domo/home'));

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
          path: 'verse',
          element: <React.Suspense><VerseAdmin /></React.Suspense>
        },
        {
          path: 'invitations',
          element: <React.Suspense><InvitationsAdmin /></React.Suspense>
        },
        {
          path: 'files',
          element: <React.Suspense><FileListAdmin /></React.Suspense>
        },
        {
          path: 'user',
          element: <React.Suspense><UserAdmin /></React.Suspense>
        },
        {
          path: 'edit/:mode/:typ/:uid',
          element: <React.Suspense><EditAdmin /></React.Suspense>,
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
    {
      path: 'go',
      element: <React.Suspense><GoPage /></React.Suspense>
    },
    {
      path: 'domo',
      element: <React.Suspense><Domo /></React.Suspense>,
      children: [
        {
          path: 'home',
          element: <React.Suspense><DomoHome /></React.Suspense>
        }
      ]
    }
  ]
);
