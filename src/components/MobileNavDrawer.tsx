import { useEffect, useRef } from 'react';
import { NAV_LINKS } from '../data/portfolioData';

interface MobileNavDrawerProps {
  isOpen: boolean;
  activeSection: string;
  onClose: () => void;
}

export function MobileNavDrawer({ isOpen, activeSection, onClose }: MobileNavDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      id="mobile-nav-drawer"
      aria-labelledby="modal-drawer-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      className="w-full max-w-xs h-full max-h-none bg-light-background dark:bg-dark-background text-light-on-background dark:text-dark-on-background border-l-2 border-light-border dark:border-dark-border rounded-none p-gutter-lg ml-auto mr-0 my-0 backdrop:bg-light-primary/70"
    >
      <header className="flex items-center justify-between border-b border-light-border dark:border-dark-border pb-gutter-md mb-gutter-lg">
        <h2 id="modal-drawer-title" className="font-title text-title-md uppercase text-balance">
          ROHAN BHATTRAI
        </h2>
        <button
          id="mobile-menu-close"
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="w-11 h-11 border border-light-border dark:border-dark-border flex items-center justify-center rounded-none cursor-pointer hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent transition-colors duration-state-change"
        >
          <span className="material-symbols-outlined text-title-md" aria-hidden="true">
            close
          </span>
        </button>
      </header>
      <nav aria-label="Mobile navigation" className="flex flex-col gap-gutter-sm font-label text-label-lg uppercase">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href.slice(1);
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`mobile-nav-link min-h-11 flex items-center py-gutter-sm border-b border-light-border dark:border-dark-border transition-colors duration-state-change ${
                isActive
                  ? 'text-light-accent dark:text-dark-accent'
                  : 'hover:text-light-accent dark:hover:text-dark-accent'
              }`}
            >
              {link.drawerLabel}
            </a>
          );
        })}
      </nav>
    </dialog>
  );
}
