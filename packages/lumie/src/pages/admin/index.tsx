import React from 'react';
import { useViewport } from '@horen/hooks';
import DesktopPage from './desktop';
import MobileAdmin from './mobile';

export default function AdminPage() {
  const { width, height } = useViewport();
  if (width < 768) {
    return '<MobileAdmin />'
  } else {
    return <DesktopPage />
  }
}