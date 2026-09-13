import { Header, Footer, MobileStickyActions, PageWrapper } from '@/components/layout';
import { Skeleton } from 'boneyard-js/react';
import { GalleryGrid, GalleryHero } from '@/components/sections';

/**
 * Gallery page — cinematic hero header + clinical case studies grid.
 */
export default function GalleryPage() {
  return (
    <Skeleton name="gallery" loading={false}>
      <PageWrapper>
        <Header />
        <main>
          {/* Cinematic gallery hero */}
          <GalleryHero />

          {/* Case studies grid — anchored for scroll cue */}
          <div id="cases">
            <GalleryGrid />
          </div>
        </main>
        <Footer />
        <MobileStickyActions />
      </PageWrapper>
    </Skeleton>
  );
}
