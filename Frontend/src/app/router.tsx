import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Skeleton } from 'boneyard-js/react';

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
        <Suspense fallback={<Skeleton name="about" loading={true} />}>
          <AboutPage />
        </Suspense>
      } />
      <Route path="/services" element={
        <Suspense fallback={<Skeleton name="services" loading={true} />}>
          <ServicesPage />
        </Suspense>
      } />
      <Route path="/gallery" element={
        <Suspense fallback={<Skeleton name="gallery" loading={true} />}>
          <GalleryPage />
        </Suspense>
      } />
      <Route path="/contact" element={
        <Suspense fallback={<Skeleton name="contact" loading={true} />}>
          <ContactPage />
        </Suspense>
      } />
    </Routes>
  );
}
