import { SKILL_GROUPS } from '../data/portfolioData';

export function SkillsSection() {
  const cellBorders = [
    'border-b md:border-r border-light-border dark:border-dark-border',
    'border-b lg:border-r border-light-border dark:border-dark-border',
    'border-b md:border-r lg:border-r-0 border-light-border dark:border-dark-border',
    'border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border',
    'border-b md:border-b-0 md:border-r border-light-border dark:border-dark-border',
    '',
  ];

  return (
    <section id="skills" className="border-b border-light-border dark:border-dark-border">
      <div className="p-gutter-md md:p-gutter-xl border-b border-light-border dark:border-dark-border flex flex-wrap items-center justify-between gap-gutter-md bg-light-surface dark:bg-dark-surface">
        <div className="flex items-baseline gap-gutter-md">
          <span className="font-section text-section-num-mobile md:text-section-num text-light-accent dark:text-dark-accent tabular-nums">
            03
          </span>
          <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg uppercase">
            TOOLS. TECHNOLOGIES. THINKING.
          </h2>
        </div>
        <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase">
          TECHNICAL MATRIX
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, idx) => {
          const items = group.items.split('/').map((s) => s.trim()).filter(Boolean);
          return (
            <div key={group.index} className={`p-gutter-lg ${cellBorders[idx] || ''} flex flex-col justify-between gap-gutter-md`}>
              <div>
                <span className="font-label text-label-sm text-light-accent dark:text-dark-accent uppercase block mb-gutter-sm">
                  {group.index}
                </span>
                <h3 className="font-title text-title-md uppercase">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-gutter-xs">
                {items.map((item) => (
                  <span
                    key={item}
                    className="px-gutter-sm py-gutter-xs border border-light-border dark:border-dark-border rounded-none bg-light-surface dark:bg-dark-surface font-label text-label-sm uppercase whitespace-nowrap shrink-0"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
