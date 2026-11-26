import { DocumentViewerItem, PORTFOLIO_IMAGES, RESEARCH_PAPER_DOCUMENT } from '../data/portfolioData';
import { resolveAssetUrl } from '../utils/assetUrl';
import { ResilientImage } from './ResilientImage';

interface ResearchSectionProps {
  onOpenDocument: (doc: DocumentViewerItem) => void;
}

export function ResearchSection({ onOpenDocument }: ResearchSectionProps) {
  const openPage = (pageIndex: number) => {
    const pages = RESEARCH_PAPER_DOCUMENT.pages || [];
    const targetPage = pages[pageIndex];
    if (!targetPage) {
      onOpenDocument(RESEARCH_PAPER_DOCUMENT);
      return;
    }
    onOpenDocument({
      ...RESEARCH_PAPER_DOCUMENT,
      pageNumber: targetPage.pageNumber,
    });
  };

  return (
    <section id="research" className="border-b border-light-border dark:border-dark-border">
      <div className="p-gutter-md md:p-gutter-xl border-b border-light-border dark:border-dark-border flex flex-wrap items-center justify-between gap-gutter-md bg-light-surface dark:bg-dark-surface">
        <div className="flex items-baseline gap-gutter-md">
          <span className="font-section text-section-num-mobile md:text-section-num text-light-accent dark:text-dark-accent tabular-nums">
            05
          </span>
          <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg uppercase">
            TECHNICAL RESEARCH PUBLICATION.
          </h2>
        </div>
        <span className="font-label text-label-sm uppercase border border-light-border dark:border-dark-border rounded-none px-gutter-sm py-gutter-xs whitespace-nowrap shrink-0">
          IJRTI // VOL. 11, ISSUE 9 // SEP 2026
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Spec & Methodology */}
        <div className="lg:col-span-7 p-gutter-md md:p-gutter-xl border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border flex flex-col gap-gutter-lg">
          <div>
            <span className="font-label text-label-sm text-light-accent dark:text-dark-accent uppercase block mb-gutter-xs">
              PAPER ID: IJRTI2609363 // ISSN: 2456-3315
            </span>
            <h3 className="font-headline text-headline-md uppercase text-balance">
              Integrating Diffusion-Based Virtual Try-On into an E-Commerce Platform: A MERN-Stack Architecture Using IDM-VTON.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 border border-light-border dark:border-dark-border rounded-none bg-light-surface dark:bg-dark-surface">
            <div className="p-gutter-md border-b sm:border-b-0 sm:border-r border-light-border dark:border-dark-border">
              <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase block mb-gutter-xs">
                Co-Authors
              </span>
              <p className="font-body text-body-md">Kishan Kushwaha, Krishna Thakur, Zaw Moe Hein, Hariom Paswan</p>
            </div>
            <div className="p-gutter-md">
              <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase block mb-gutter-xs">
                Research Guide
              </span>
              <p className="font-body text-body-md">Prof. Ankita Verma (Parul Institute of Engineering &amp; Technology)</p>
            </div>
          </div>

          <div className="flex flex-col gap-gutter-md">
            <div>
              <h4 className="font-label text-label-lg uppercase text-light-accent dark:text-dark-accent mb-gutter-xs">
                01 // Overview &amp; Proposed Architecture
              </h4>
              <p className="font-body text-body-md text-light-secondary dark:text-dark-secondary text-pretty">
                Addresses apparel e-commerce return rates caused by fit and appearance uncertainty. The paper traces the shift from GAN-based warping networks (VITON) to diffusion-based approaches and presents a{' '}
                <strong className="text-light-on-background dark:text-dark-on-background font-semibold">
                  proposed MERN-stack system architecture
                </strong>{' '}
                (not a fully validated production deployment) integrating a pretrained IDM-VTON model.
              </p>
            </div>

            <div>
              <h4 className="font-label text-label-lg uppercase text-light-accent dark:text-dark-accent mb-gutter-xs">
                02 // Methodology &amp; Stack
              </h4>
              <p className="font-body text-body-md text-light-secondary dark:text-dark-secondary text-pretty">
                React storefront handles customer and garment image selection; Node.js and Express.js manage API orchestration and MongoDB persistence; Python and PyTorch execute IDM-VTON diffusion inference to synthesize garment-on-person previews.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-gutter-md pt-gutter-sm">
            <button
              type="button"
              onClick={() => onOpenDocument(RESEARCH_PAPER_DOCUMENT)}
              className="inline-flex items-center justify-center gap-gutter-sm w-full sm:w-auto min-h-11 px-gutter-lg py-gutter-md bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary border border-light-border dark:border-dark-border rounded-none font-label text-label-lg uppercase whitespace-nowrap shrink-0 cursor-pointer hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent hover:border-light-accent dark:hover:border-dark-accent transition-colors duration-state-change"
            >
              <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                fullscreen
              </span>
              <span>Inspect Paper Preview</span>
            </button>

            <a
              href={resolveAssetUrl(PORTFOLIO_IMAGES.researchPaperPdf)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-gutter-sm w-full sm:w-auto min-h-11 px-gutter-lg py-gutter-md bg-light-surface dark:bg-dark-surface text-light-on-surface dark:text-dark-on-surface border border-light-border dark:border-dark-border rounded-none font-label text-label-lg uppercase whitespace-nowrap shrink-0 hover:border-light-accent dark:hover:border-dark-accent transition-colors duration-state-change"
            >
              <span>Open Original PDF</span>
              <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                arrow_outward
              </span>
            </a>
          </div>
        </div>

        {/* Right Original Document Previews */}
        <div className="lg:col-span-5 p-gutter-md md:p-gutter-xl bg-light-surface-alt dark:bg-dark-surface-alt flex flex-col gap-gutter-md">
          <span className="font-label text-label-sm uppercase">ORIGINAL DOCUMENT PREVIEWS (PAGES 01–02)</span>
          <div className="grid grid-cols-2 gap-gutter-md">
            <button
              type="button"
              onClick={() => openPage(0)}
              className="border border-light-border dark:border-dark-border rounded-none bg-light-surface dark:bg-dark-surface p-gutter-xs text-left cursor-pointer hover:border-light-accent dark:hover:border-dark-accent transition-colors duration-state-change"
            >
              <ResilientImage
                src={PORTFOLIO_IMAGES.researchPaperPdf}
                pageNumber={1}
                alt="Research paper page 1 cover"
                fallbackTitle="Page 01 // Cover"
                fallbackMeta="IJRTI Vol. 11"
                className="w-full h-48 sm:h-64 object-cover object-top bg-light-surface dark:bg-dark-surface"
              />
              <span className="font-label text-label-sm uppercase block mt-gutter-xs">PAGE 01 // COVER</span>
            </button>

            <button
              type="button"
              onClick={() => openPage(1)}
              className="border border-light-border dark:border-dark-border rounded-none bg-light-surface dark:bg-dark-surface p-gutter-xs text-left cursor-pointer hover:border-light-accent dark:hover:border-dark-accent transition-colors duration-state-change"
            >
              <ResilientImage
                src={PORTFOLIO_IMAGES.researchPaperPdf}
                pageNumber={2}
                alt="Research paper page 2 preview"
                fallbackTitle="Page 02 // Spec"
                fallbackMeta="IJRTI Vol. 11"
                className="w-full h-48 sm:h-64 object-cover object-top bg-light-surface dark:bg-dark-surface"
              />
              <span className="font-label text-label-sm uppercase block mt-gutter-xs">PAGE 02 // REVIEW</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
