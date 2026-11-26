export function ContactSection() {
  return (
    <section id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-gutter-md md:p-gutter-xl border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border flex flex-col justify-between gap-gutter-xl">
          <div>
            <span className="font-section text-section-num-mobile md:text-section-num text-light-accent dark:text-dark-accent block tabular-nums">
              07
            </span>
            <h2 className="font-display text-display-lg-mobile md:text-display-lg uppercase mt-gutter-sm text-balance">
              LET&apos;S BUILD SOMETHING USEFUL.
            </h2>
          </div>
          <p className="font-body text-body-lg text-light-secondary dark:text-dark-secondary max-w-prose">
            Open to software engineering collaborations, full-stack builds, and applied AI or blockchain research discussions.
          </p>
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <a
            href="mailto:zapcrash7@gmail.com"
            className="p-gutter-lg border-b border-light-border dark:border-dark-border flex items-center justify-between gap-gutter-md hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent transition-colors duration-state-change group"
          >
            <div className="min-w-0">
              <span className="font-label text-label-sm uppercase opacity-75 block">EMAIL</span>
              <span className="font-title text-title-md break-all">zapcrash7@gmail.com</span>
            </div>
            <span className="material-symbols-outlined text-title-md shrink-0" aria-hidden="true">
              arrow_outward
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/rohan-btr-550972268/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-gutter-lg border-b border-light-border dark:border-dark-border flex items-center justify-between gap-gutter-md hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent transition-colors duration-state-change group"
          >
            <div className="min-w-0">
              <span className="font-label text-label-sm uppercase opacity-75 block">LINKEDIN</span>
              <span className="font-title text-title-md uppercase break-all">linkedin.com/in/rohan-btr</span>
            </div>
            <span className="material-symbols-outlined text-title-md shrink-0" aria-hidden="true">
              arrow_outward
            </span>
          </a>

          <a
            href="https://github.com/Rohan-Btr"
            target="_blank"
            rel="noopener noreferrer"
            className="p-gutter-lg flex items-center justify-between hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent transition-colors duration-state-change group flex-1"
          >
            <div>
              <span className="font-label text-label-sm uppercase opacity-75 block">GITHUB</span>
              <span className="font-title text-title-md uppercase text-balance">github.com/Rohan-Btr</span>
            </div>
            <span className="material-symbols-outlined text-title-md shrink-0" aria-hidden="true">
              arrow_outward
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
