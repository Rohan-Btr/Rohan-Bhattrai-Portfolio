import { PORTFOLIO_IMAGES } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  return (
    <section className="border-b border-light-border dark:border-dark-border">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Asymmetric Editorial Column */}
        <div className="lg:col-span-7 p-gutter-md md:p-gutter-xl border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border flex flex-col justify-between gap-gutter-xl">
          <div className="flex flex-col gap-gutter-lg">
            <div className="flex flex-wrap items-center justify-between gap-gutter-sm border-b border-light-border dark:border-dark-border pb-gutter-md">
              <span className="font-label text-label-lg text-light-accent dark:text-dark-accent uppercase">
                B.TECH CSE // FULL-STACK, WEB3 &amp; AI
              </span>
              <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase tabular-nums">
                SYS.00 // PORTFOLIO 2026
              </span>
            </div>

            <h1 className="font-display text-display-xl-mobile md:text-display-lg lg:text-display-xl uppercase text-balance">
              SOFTWARE ENGINEER &amp; CREATIVE DEVELOPER.
            </h1>

            <p className="font-body text-body-lg text-light-secondary dark:text-dark-secondary max-w-prose text-pretty">
              B.Tech Computer Science student at Parul University building full-stack MERN applications, decentralized systems, and applied AI architectures.
            </p>
          </div>

          <div className="flex flex-col gap-gutter-lg">
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-gutter-md">
              <a
                href="#work"
                className="inline-flex items-center justify-center gap-gutter-sm w-full sm:w-auto min-h-11 px-gutter-lg py-gutter-md bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary border border-light-border dark:border-dark-border rounded-none font-label text-label-lg uppercase whitespace-nowrap shrink-0 transition-colors duration-state-change hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent hover:border-light-accent dark:hover:border-dark-accent"
              >
                <span>Explore My Work</span>
                <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                  south_east
                </span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-gutter-sm w-full sm:w-auto min-h-11 px-gutter-lg py-gutter-md bg-light-surface dark:bg-dark-surface text-light-on-surface dark:text-dark-on-surface border border-light-border dark:border-dark-border rounded-none font-label text-label-lg uppercase whitespace-nowrap shrink-0 transition-colors duration-state-change hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-on-primary dark:hover:text-dark-on-primary"
              >
                <span>Let&apos;s Connect</span>
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-light-border dark:border-dark-border pt-gutter-md gap-gutter-md">
              <div>
                <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase block">
                  Degree
                </span>
                <span className="font-label text-label-lg uppercase text-balance">B.Tech CSE</span>
              </div>
              <div>
                <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase block">
                  Location
                </span>
                <span className="font-label text-label-lg uppercase text-balance">Vadodara, IN</span>
              </div>
              <div>
                <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase block">
                  Code
                </span>
                <a
                  href="https://github.com/Rohan-Btr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-gutter-xs py-gutter-xs font-label text-label-lg uppercase underline underline-offset-4 hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-state-change"
                >
                  <span>GitHub</span>
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                    arrow_outward
                  </span>
                </a>
              </div>
              <div>
                <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase block">
                  Network
                </span>
                <a
                  href="https://www.linkedin.com/in/rohan-btr-550972268/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-gutter-xs py-gutter-xs font-label text-label-lg uppercase underline underline-offset-4 hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-state-change"
                >
                  <span>LinkedIn</span>
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                    arrow_outward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Portrait Column */}
        <div className="lg:col-span-5 bg-light-surface dark:bg-dark-surface flex flex-col justify-between">
          <div className="p-gutter-md md:p-gutter-lg flex-1 flex items-center justify-center bg-light-surface-alt dark:bg-dark-surface-alt">
            <div className="w-full max-w-md border-2 border-light-border dark:border-dark-border rounded-none bg-light-surface dark:bg-dark-surface relative overflow-hidden group">
              <ResilientImage
                src={PORTFOLIO_IMAGES.portrait}
                alt="Rohan Bhattrai (Rohan Btr) professional portrait"
                fallbackTitle="Rohan Bhattrai (Rohan Btr)"
                fallbackMeta="B.Tech CSE // Parul University"
                className="w-full aspect-4/5 object-cover object-top transition-transform duration-surface-enter group-hover:scale-102"
              />
              <div className="border-t border-light-border dark:border-dark-border px-gutter-md py-gutter-sm bg-light-surface dark:bg-dark-surface flex items-center justify-between">
                <span className="font-label text-label-sm uppercase">PARUL UNIVERSITY // 2023–2027</span>
                <span className="w-2.5 h-2.5 rounded-none bg-light-accent dark:bg-dark-accent inline-block" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="px-gutter-md md:px-gutter-lg py-gutter-md border-t border-light-border dark:border-dark-border bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary">
            <p className="font-label text-label-lg uppercase tracking-wide text-center">
              &quot;BUILDING IDEAS. ENGINEERING EXPERIENCES.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
