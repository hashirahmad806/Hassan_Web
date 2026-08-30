import { Header, Footer, MobileStickyActions, PageWrapper } from '@/components/layout';
import { Hero, Treatments, AuraStandard, About, Journey, CTA } from '@/components/sections';
import { PagePreloader } from '@/components/animations/PagePreloader';

/**
 * Home page — main landing with all primary sections.
 */
export default function HomePage() {
  return (
    <PageWrapper>
      <PagePreloader />
      <Header />
      <main>
        <Hero />
        <Treatments />
        <AuraStandard />
        <About />
        <Journey />
        <CTA />
      </main>
      <Footer />
      <MobileStickyActions />
    </PageWrapper>
  );
}
