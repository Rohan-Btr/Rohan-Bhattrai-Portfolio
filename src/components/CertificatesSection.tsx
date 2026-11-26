import { useMemo, useState } from 'react';
import { CERTIFICATES, CertificateItem } from '../data/portfolioData';
import { resolveAssetUrl } from '../utils/assetUrl';
import { ResilientImage } from './ResilientImage';

interface CertificatesSectionProps {
  onOpenCertificate: (cert: CertificateItem, filteredList: CertificateItem[]) => void;
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function CertificatesSection({ onOpenCertificate }: CertificatesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const tabs = useMemo(() => {
    const counts = new Map<string, number>();
    const labels = new Map<string, string>();

    counts.set('all', CERTIFICATES.length);
    labels.set('all', 'All');

    for (const cert of CERTIFICATES) {
      counts.set(cert.category, (counts.get(cert.category) || 0) + 1);
      if (!labels.has(cert.category)) {
        labels.set(cert.category, cert.categoryLabel || cert.category);
      }
    }

    return Array.from(counts.entries()).map(([key, count]) => ({
      key,
      label: `${labels.get(key)} (${pad2(count)})`,
    }));
  }, []);

  const filteredCertificates = useMemo(() => {
    return CERTIFICATES.filter(
      (cert) => activeFilter === 'all' || cert.category === activeFilter
    );
  }, [activeFilter]);

  return (
    <section id="certificates" className="border-b border-light-border dark:border-dark-border">
      <div className="p-gutter-md md:p-gutter-xl border-b border-light-border dark:border-dark-border flex flex-col gap-gutter-lg bg-light-surface dark:bg-dark-surface">
        <div className="flex flex-wrap items-center justify-between gap-gutter-md">
          <div className="flex items-baseline gap-gutter-md">
            <span className="font-section text-section-num-mobile md:text-section-num text-light-accent dark:text-dark-accent tabular-nums">
              06
            </span>
            <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg uppercase">
              DIGITAL CREDENTIAL ARCHIVE.
            </h2>
          </div>
          <span
            id="cert-count-label"
            className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase tabular-nums"
          >
            {pad2(CERTIFICATES.length)} VERIFIED ORIGINAL DOCUMENTS // ZAW MOE HEIN
          </span>
        </div>

        {/* Category Filter Tabs */}
        <div>
          <div
            id="cert-tablist"
            role="tablist"
            aria-label="Certificate archive categories"
            className="flex flex-wrap gap-gutter-xs"
          >
            {tabs.map((tab) => {
              const isActive = tab.key === activeFilter;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(tab.key)}
                  className={`min-h-11 px-gutter-md py-gutter-sm border rounded-none font-label text-label-lg uppercase whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-state-change ${
                    isActive
                      ? 'bg-light-accent dark:bg-dark-accent text-light-on-accent dark:text-dark-on-accent border-light-accent dark:border-dark-accent'
                      : 'bg-light-background dark:bg-dark-background text-light-on-background dark:text-dark-on-background border-light-border dark:border-dark-border hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-on-primary dark:hover:text-dark-on-primary'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Cards Grid (neutral canvas prevents dark void on filtered subsets) */}
      <div
        id="cert-grid"
        className="p-gutter-md md:p-gutter-xl bg-light-surface-alt dark:bg-dark-surface-alt grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg"
      >
        {filteredCertificates.map((cert) => {
          const arcIndex = CERTIFICATES.indexOf(cert) + 1;
          return (
            <article
              key={cert.id}
              data-category={cert.category}
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-none flex flex-col justify-between"
            >
              <header className="p-gutter-md border-b border-light-border dark:border-dark-border flex items-baseline justify-between gap-gutter-sm">
                <span className="font-label text-label-lg text-light-accent dark:text-dark-accent uppercase tabular-nums">
                  ARC.{pad2(arcIndex)}
                </span>
                <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase tabular-nums text-right">
                  {cert.issuer} // {cert.date}
                </span>
              </header>

              <button
                type="button"
                onClick={() => onOpenCertificate(cert, filteredCertificates)}
                aria-label={`Preview ${cert.title}`}
                className="p-gutter-md bg-light-surface-alt dark:bg-dark-surface-alt border-b border-light-border dark:border-dark-border rounded-none cursor-pointer block w-full text-left group"
              >
                <ResilientImage
                  src={cert.file}
                  rotation={cert.rotation}
                  alt={cert.title}
                  fallbackTitle={cert.title}
                  fallbackMeta={`${cert.issuer} // ${cert.date}`}
                  className="w-full h-56 object-contain bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-none transition-transform duration-state-change group-hover:scale-101"
                />
              </button>

              <div className="p-gutter-md flex-1">
                <h3 className="font-title text-title-md uppercase mb-gutter-xs text-balance">
                  {cert.title}
                </h3>
                <p className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase">
                  {cert.credentialId}
                </p>
              </div>

              <footer className="px-gutter-md py-gutter-xs border-t border-light-border dark:border-dark-border flex flex-wrap items-center justify-between gap-gutter-sm">
                <button
                  type="button"
                  onClick={() => onOpenCertificate(cert, filteredCertificates)}
                  className="min-h-11 inline-flex items-center rounded-none font-label text-label-sm uppercase text-light-accent dark:text-dark-accent hover:underline cursor-pointer transition-colors duration-state-change"
                >
                  Full-Screen Viewer
                </button>
                <div className="flex items-center gap-gutter-md">
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-11 inline-flex items-center rounded-none font-label text-label-sm uppercase underline hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-state-change"
                    >
                      Verify
                    </a>
                  )}
                  <a
                    href={resolveAssetUrl(cert.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-11 inline-flex items-center rounded-none font-label text-label-sm uppercase underline hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-state-change"
                  >
                    PDF
                  </a>
                </div>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}
