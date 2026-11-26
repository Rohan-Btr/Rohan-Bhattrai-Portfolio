import { useEffect } from 'react';

export function ScrollProgressBar() {
  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const ratio =
        maxScroll <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / maxScroll));
      doc.style.setProperty('--scroll-progress', ratio.toFixed(4));
    };

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-gutter-xs bg-transparent pointer-events-none"
    >
      <div className="h-full w-full origin-left scale-x-(--scroll-progress) bg-light-accent dark:bg-dark-accent rounded-none will-change-transform" />
    </div>
  );
}
