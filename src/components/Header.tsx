import { NAV_LINKS } from '../data/portfolioData';

interface HeaderProps {
  isDark: boolean;
  activeSection: string;
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
}

export function Header({
  isDark,
  activeSection,
  onToggleTheme,
  onOpenMobileMenu,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-light-background dark:bg-dark-background border-b border-light-border dark:border-dark-border">
      <div className="flex items-center justify-between px-gutter-md md:px-gutter-xl h-16 gap-gutter-md">
        <a
          href="#top"
          className="inline-flex items-center whitespace-nowrap shrink-0 hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-state-change focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent"
        >
          <span className="font-title text-title-md uppercase tracking-tight">ROHAN BHATTRAI</span>
        </a>

        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-gutter-md xl:gap-gutter-lg">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`font-label text-label-sm uppercase whitespace-nowrap shrink-0 border-b-2 py-gutter-xs transition-colors duration-state-change focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent ${
                  isActive
                    ? 'text-light-accent dark:text-dark-accent border-light-accent dark:border-dark-accent'
                    : 'border-transparent hover:text-light-accent dark:hover:text-dark-accent hover:border-light-accent dark:hover:border-dark-accent'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-gutter-sm shrink-0">
          <button
            id="theme-toggle"
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle light or dark theme"
            aria-pressed={isDark}
            className="inline-flex items-center justify-center gap-gutter-xs w-11 h-11 sm:w-auto sm:px-gutter-md bg-light-surface dark:bg-dark-surface text-light-on-surface dark:text-dark-on-surface border border-light-border dark:border-dark-border rounded-none font-label text-label-sm uppercase whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-state-change hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent hover:border-light-accent dark:hover:border-dark-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent"
          >
            <span className="material-symbols-outlined text-body-md" aria-hidden="true">
              contrast
            </span>
            <span className="hidden sm:inline">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>

          <button
            id="mobile-menu-open"
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="Open navigation menu"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 bg-light-surface dark:bg-dark-surface text-light-on-surface dark:text-dark-on-surface border border-light-border dark:border-dark-border rounded-none cursor-pointer transition-colors duration-state-change hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent"
          >
            <span className="material-symbols-outlined text-title-md" aria-hidden="true">
              menu
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
