import { useCallback, useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { JourneySection } from './components/JourneySection';
import { MobileNavDrawer } from './components/MobileNavDrawer';
import { ResearchSection } from './components/ResearchSection';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SkillsSection } from './components/SkillsSection';
import { WorkSection } from './components/WorkSection';
import { CertificateItem, DocumentViewerItem, NAV_LINKS } from './data/portfolioData';

function certificateToViewerItem(cert: CertificateItem): DocumentViewerItem {
  return {
    title: cert.title,
    meta: `${cert.issuer} // ${cert.date} // ${cert.credentialId}`,
    file: cert.file,
    rotation: cert.rotation,
    verifyUrl: cert.verifyUrl,
  };
}

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('rohanbtr-theme') === 'dark';
    } catch {
      return false;
    }
  });

  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDocument, setActiveDocument] = useState<DocumentViewerItem | null>(null);
  const [certSequence, setCertSequence] = useState<{
    items: CertificateItem[];
    index: number;
  } | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('rohanbtr-theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage failures in restricted environments
    }
  }, [isDark]);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.slice(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleOpenDocument = useCallback((doc: DocumentViewerItem) => {
    setCertSequence(null);
    setActiveDocument(doc);
  }, []);

  const handleOpenCertificate = useCallback(
    (cert: CertificateItem, filteredList: CertificateItem[]) => {
      const idx = filteredList.findIndex((c) => c.id === cert.id);
      setCertSequence({
        items: filteredList,
        index: idx >= 0 ? idx : 0,
      });
      setActiveDocument(certificateToViewerItem(cert));
    },
    []
  );

  const handleCloseModal = useCallback(() => {
    setActiveDocument(null);
    setCertSequence(null);
  }, []);

  const handlePrevCert = useCallback(() => {
    if (!certSequence || certSequence.items.length <= 1) return;
    const prevIdx =
      (certSequence.index - 1 + certSequence.items.length) % certSequence.items.length;
    setCertSequence({ ...certSequence, index: prevIdx });
    setActiveDocument(certificateToViewerItem(certSequence.items[prevIdx]));
  }, [certSequence]);

  const handleNextCert = useCallback(() => {
    if (!certSequence || certSequence.items.length <= 1) return;
    const nextIdx = (certSequence.index + 1) % certSequence.items.length;
    setCertSequence({ ...certSequence, index: nextIdx });
    setActiveDocument(certificateToViewerItem(certSequence.items[nextIdx]));
  }, [certSequence]);

  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-gutter-md focus:py-gutter-sm focus:bg-light-accent focus:text-light-on-accent focus:font-label focus:text-label-sm focus:uppercase"
      >
        Skip to content
      </a>
      <ScrollProgressBar />
      <div className="min-h-screen w-full max-w-[1440px] mx-auto border-x border-light-border dark:border-dark-border flex flex-col">
        <Header
          isDark={isDark}
          activeSection={activeSection}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main id="top" className="flex-1">
          <HeroSection />
          <AboutSection />
          <JourneySection />
          <SkillsSection />
          <WorkSection />
          <ResearchSection onOpenDocument={handleOpenDocument} />
          <CertificatesSection onOpenCertificate={handleOpenCertificate} />
          <ContactSection />
        </main>

        <footer className="border-t border-light-border dark:border-dark-border px-gutter-md md:px-gutter-xl py-gutter-lg flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-gutter-sm sm:gap-gutter-md bg-light-surface dark:bg-dark-surface">
          <span className="font-label text-label-sm uppercase">
            ROHAN BHATTRAI // &copy; 2026
          </span>
          <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase">
            B.TECH CSE (2023–2027) // VADODARA, INDIA
          </span>
          <a
            href="#top"
            className="inline-flex items-center gap-gutter-xs min-h-11 sm:min-h-0 font-label text-label-sm uppercase hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-state-change self-start sm:self-auto"
          >
            <span>Back to Top</span>
            <span className="material-symbols-outlined text-body-md" aria-hidden="true">
              arrow_upward
            </span>
          </a>
        </footer>
      </div>

      <DocumentViewerModal
        documentItem={activeDocument}
        onClose={handleCloseModal}
        onPrev={handlePrevCert}
        onNext={handleNextCert}
        hasPagination={Boolean(certSequence && certSequence.items.length > 1)}
      />

      <MobileNavDrawer
        isOpen={isMobileMenuOpen}
        activeSection={activeSection}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
