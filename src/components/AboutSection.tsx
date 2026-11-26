export function AboutSection() {
  return (
    <section id="about" className="border-b border-light-border dark:border-dark-border">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4 p-gutter-md md:p-gutter-xl border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border flex flex-col justify-between gap-gutter-lg bg-light-surface-alt dark:bg-dark-surface-alt">
          <div>
            <span className="font-section text-section-num-mobile md:text-section-num text-light-accent dark:text-dark-accent block tabular-nums">
              01
            </span>
            <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase block mt-gutter-xs">
              IDENTITY &amp; FOCUS
            </span>
          </div>
          <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg uppercase text-balance">
            THE PERSON BEHIND THE CODE.
          </h2>
        </div>

        <div className="lg:col-span-8 p-gutter-md md:p-gutter-xl flex flex-col gap-gutter-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-lg">
            <div className="border border-light-border dark:border-dark-border rounded-none p-gutter-lg bg-light-surface dark:bg-dark-surface">
              <span className="font-label text-label-sm text-light-accent dark:text-dark-accent uppercase block mb-gutter-sm">
                ACADEMIC BASE // 2023 — MAY 2027
              </span>
              <h3 className="font-title text-title-md uppercase mb-gutter-sm text-balance">
                B.Tech Computer Science &amp; Engineering
              </h3>
              <p className="font-body text-body-md text-light-secondary dark:text-dark-secondary text-pretty">
                Studying at Parul University, Vadodara, Gujarat, India (2023 — Expected Graduation: May 2027). Building a solid foundation across computer networks, internet protocols, IoT systems, and modern web engineering.
              </p>
            </div>

            <div className="border border-light-border dark:border-dark-border rounded-none p-gutter-lg bg-light-surface dark:bg-dark-surface">
              <span className="font-label text-label-sm text-light-accent dark:text-dark-accent uppercase block mb-gutter-sm">
                ENGINEERING DIRECTION
              </span>
              <h3 className="font-title text-title-md uppercase mb-gutter-sm text-balance">
                Full-Stack, Blockchain &amp; Applied AI
              </h3>
              <p className="font-body text-body-md text-light-secondary dark:text-dark-secondary text-pretty">
                Focused on MERN-stack architecture, decentralized systems (on-chain analysis and TEE coprocessors), and integrating diffusion-based AI models into practical web applications.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 border border-light-border dark:border-dark-border rounded-none bg-light-surface dark:bg-dark-surface">
            <div className="p-gutter-md sm:border-r border-b sm:border-b-0 border-light-border dark:border-dark-border">
              <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase block">
                Handle
              </span>
              <a
                href="https://github.com/Rohan-Btr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-title text-title-md uppercase text-balance underline underline-offset-4 hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-state-change"
              >
                @Rohan-Btr
              </a>
            </div>
            <div className="p-gutter-md sm:border-r border-b sm:border-b-0 border-light-border dark:border-dark-border">
              <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase block">
                Professional Name
              </span>
              <span className="font-title text-title-md uppercase text-balance">Rohan Bhattrai</span>
            </div>
            <div className="p-gutter-md">
              <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase block">
                Academic / Cert Name
              </span>
              <span className="font-title text-title-md uppercase text-balance">Zaw Moe Hein</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
