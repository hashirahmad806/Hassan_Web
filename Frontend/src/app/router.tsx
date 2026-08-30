import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '@/app/pages/HomePage';
const AboutPage = lazy(() => import('@/app/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/app/pages/ServicesPage'));
const GalleryPage = lazy(() => import('@/app/pages/GalleryPage'));
const ContactPage = lazy(() => import('@/app/pages/ContactPage'));

/**
 * Application router with code-split routes.
 */
export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={
        <Suspense fallback={null}>
          <AboutPage />
        </Suspense>
      } />
      <Route path="/services" element={
        <Suspense fallback={null}>
          <ServicesPage />
        </Suspense>
      } />
      <Route path="/gallery" element={
        <Suspense fallback={null}>
          <GalleryPage />
        </Suspense>
      } />
      <Route path="/contact" element={
        <Suspense fallback={null}>
          <ContactPage />
        </Suspense>
      } />
    </Routes>
  );
}
