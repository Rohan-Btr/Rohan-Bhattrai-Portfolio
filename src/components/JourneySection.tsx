import { JOURNEY_MILESTONES } from '../data/portfolioData';

export function JourneySection() {
  const shortPeriods = ['AUG 2023', 'JAN–APR', 'SEP 2026', 'OCT–NOV'];

  return (
    <section id="journey" className="border-b border-light-border dark:border-dark-border">
      <div className="p-gutter-md md:p-gutter-xl border-b border-light-border dark:border-dark-border flex flex-wrap items-center justify-between gap-gutter-md">
        <div className="flex items-baseline gap-gutter-md">
          <span className="font-section text-section-num-mobile md:text-section-num text-light-accent dark:text-dark-accent tabular-nums">
            02
          </span>
          <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg uppercase">
            ACADEMIC &amp; TECHNICAL JOURNEY.
          </h2>
        </div>
        <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase">
          2023 — MAY 2027 // VERIFIED MILESTONES
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {JOURNEY_MILESTONES.map((milestone, idx) => {
          const borderClasses =
            idx === 0
              ? 'border-b lg:border-b-0 md:border-r border-light-border dark:border-dark-border'
              : idx === 1
                ? 'border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border'
                : idx === 2
                  ? 'border-b md:border-b-0 md:border-r border-light-border dark:border-dark-border'
                  : '';

          const markerClass =
            milestone.markerStyle === 'accent'
              ? 'w-4 h-4 rounded-none bg-light-accent dark:bg-dark-accent inline-block shrink-0'
              : milestone.markerStyle === 'outline'
                ? 'w-4 h-4 rounded-none border-2 border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface inline-block shrink-0'
                : 'w-4 h-4 rounded-none border-2 border-light-border dark:border-dark-border bg-light-primary dark:bg-dark-primary inline-block shrink-0';

          return (
            <div
              key={`${milestone.year}-${milestone.title}`}
              className={`p-gutter-md md:p-gutter-lg ${borderClasses} flex flex-col gap-gutter-md`}
            >
              <div className="flex items-center justify-between gap-gutter-sm">
                <div className="flex items-baseline gap-gutter-sm">
                  <span className="font-display text-display-lg-mobile md:text-display-lg tabular-nums">
                    {milestone.year}
                  </span>
                  <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase">
                    {shortPeriods[idx]}
                  </span>
                </div>
                <span className={markerClass} aria-hidden="true" />
              </div>
              <div className="border-t border-light-border dark:border-dark-border pt-gutter-md flex flex-col gap-gutter-sm">
                <span className="font-label text-label-sm text-light-accent dark:text-dark-accent uppercase">
                  {milestone.meta}
                </span>
                <h3 className="font-title text-title-md uppercase text-balance">{milestone.title}</h3>
                <p className="font-body text-body-md text-light-secondary dark:text-dark-secondary">
                  {milestone.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
