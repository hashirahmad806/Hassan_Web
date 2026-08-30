import { Header, Footer, MobileStickyActions, PageWrapper } from '@/components/layout';
import { Skeleton } from 'boneyard-js/react';
import { GalleryGrid } from '@/components/sections';

/**
 * Gallery page for clinical case studies.
 */
export default function GalleryPage() {
  return (
    <Skeleton name="gallery" loading={false}>
      <PageWrapper>
        <Header />
        <main className="pt-24">
          <GalleryGrid />
        </main>
        <Footer />
        <MobileStickyActions />
      </PageWrapper>
    </Skeleton>
  );
}
