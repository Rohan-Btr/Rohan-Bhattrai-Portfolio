import { useEffect, useRef, useState } from 'react';
import { DocumentViewerItem } from '../data/portfolioData';
import { isPdfPath, resolveAssetUrl } from '../utils/assetUrl';
import { ResilientImage } from './ResilientImage';

interface DocumentViewerModalProps {
  documentItem: DocumentViewerItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPagination?: boolean;
}

export function DocumentViewerModal({
  documentItem,
  onClose,
  onPrev,
  onNext,
  hasPagination = false,
}: DocumentViewerModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activePageIdx, setActivePageIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (documentItem?.pages && documentItem.pageNumber) {
      const matchedIdx = documentItem.pages.findIndex(
        (p) => p.pageNumber === documentItem.pageNumber
      );
      setActivePageIdx(matchedIdx >= 0 ? matchedIdx : 0);
    } else {
      setActivePageIdx(0);
    }
    setIsZoomed(false);
  }, [documentItem]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (documentItem && !dialog.open) {
      dialog.showModal();
    } else if (!documentItem && dialog.open) {
      dialog.close();
    }
  }, [documentItem]);

  useEffect(() => {
    if (!documentItem) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        if (documentItem.pages && documentItem.pages.length > 1) {
          setActivePageIdx((idx) => (idx - 1 + documentItem.pages!.length) % documentItem.pages!.length);
        } else if (hasPagination && onPrev) {
          onPrev();
        }
      } else if (e.key === 'ArrowRight') {
        if (documentItem.pages && documentItem.pages.length > 1) {
          setActivePageIdx((idx) => (idx + 1) % documentItem.pages!.length);
        } else if (hasPagination && onNext) {
          onNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [documentItem, hasPagination, onPrev, onNext]);

  const activePage =
    documentItem?.pages && documentItem.pages.length > 0
      ? documentItem.pages[activePageIdx] || documentItem.pages[0]
      : null;

  const displayFile = activePage ? activePage.file : documentItem?.file || '';
  const displayPageNumber = activePage?.pageNumber ?? documentItem?.pageNumber ?? 1;
  const displayRotation = activePage?.rotation ?? documentItem?.rotation ?? 0;
  const displayAlt = activePage ? activePage.alt : documentItem?.title || 'Document preview';
  const rawFileUrl = resolveAssetUrl(documentItem?.file || displayFile);
  const isPdf = isPdfPath(displayFile);

  return (
    <dialog
      ref={dialogRef}
      id="doc-viewer-modal"
      aria-labelledby="modal-doc-title"
      aria-describedby="modal-doc-meta"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          onClose();
        }
      }}
      className="w-[95vw] max-w-5xl m-auto bg-light-surface dark:bg-dark-surface text-light-on-surface dark:text-dark-on-surface border-2 border-light-border dark:border-dark-border rounded-none p-0 backdrop:bg-light-primary/85"
    >
      {documentItem && (
        <div className="flex flex-col">
          <header className="p-gutter-md md:p-gutter-lg border-b border-light-border dark:border-dark-border flex items-center justify-between gap-gutter-md">
            <div className="min-w-0">
              <h2 id="modal-doc-title" className="font-title text-title-md uppercase text-balance">
                {documentItem.title}
              </h2>
              <p
                id="modal-doc-meta"
                className="font-label text-label-sm text-light-accent dark:text-dark-accent uppercase mt-gutter-xs"
              >
                {documentItem.meta}
              </p>
            </div>
            <div className="flex items-center gap-gutter-xs shrink-0">
              <button
                type="button"
                onClick={() => setIsZoomed((z) => !z)}
                aria-label={isZoomed ? 'Fit document to frame' : 'Zoom in document'}
                className="inline-flex items-center justify-center w-11 h-11 border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-on-background dark:text-dark-on-background hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent rounded-none cursor-pointer transition-colors duration-state-change"
              >
                <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                  {isZoomed ? 'zoom_out' : 'zoom_in'}
                </span>
              </button>
              <button
                id="modal-close-btn"
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="inline-flex items-center justify-center w-11 h-11 border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-on-background dark:text-dark-on-background hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent rounded-none cursor-pointer transition-colors duration-state-change"
              >
                <span className="material-symbols-outlined text-title-md" aria-hidden="true">
                  close
                </span>
              </button>
            </div>
          </header>

          {documentItem.pages && documentItem.pages.length > 1 && (
            <div className="px-gutter-md md:px-gutter-lg py-gutter-sm border-b border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background flex flex-wrap items-center justify-between gap-gutter-sm">
              <div className="flex flex-wrap gap-gutter-xs">
                {documentItem.pages.map((page, idx) => {
                  const isActive = idx === activePageIdx;
                  return (
                    <button
                      key={page.label}
                      type="button"
                      onClick={() => setActivePageIdx(idx)}
                      className={`px-gutter-md py-gutter-xs border font-label text-label-sm uppercase rounded-none cursor-pointer transition-colors duration-state-change ${
                        isActive
                          ? 'bg-light-accent dark:bg-dark-accent text-light-on-accent dark:text-dark-on-accent border-light-accent dark:border-dark-accent'
                          : 'bg-light-surface dark:bg-dark-surface text-light-on-surface dark:text-dark-on-surface border-light-border dark:border-dark-border hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-on-primary dark:hover:text-dark-on-primary'
                      }`}
                    >
                      {page.label}
                    </button>
                  );
                })}
              </div>
              {documentItem.summary && (
                <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase hidden sm:inline">
                  MULTI-PAGE ARCHIVE VIEW
                </span>
              )}
            </div>
          )}

          <div
            id="doc-viewer-print-area"
            className="p-gutter-md md:p-gutter-lg bg-light-surface-alt dark:bg-dark-surface-alt max-h-[70vh] overflow-auto flex flex-col items-center gap-gutter-md"
          >
            <ResilientImage
              src={displayFile}
              pageNumber={displayPageNumber}
              maxDimension={2200}
              rotation={displayRotation}
              alt={displayAlt}
              fallbackTitle={documentItem.title}
              fallbackMeta={documentItem.meta}
              className={`border border-light-border dark:border-dark-border rounded-none bg-light-surface dark:bg-dark-surface transition-transform duration-state-change ${
                isZoomed ? 'w-full max-w-none scale-100' : 'max-w-full h-auto max-h-[62vh] object-contain'
              }`}
            />
            {documentItem.summary && (
              <p className="font-body text-body-md text-light-secondary dark:text-dark-secondary max-w-3xl text-center">
                {documentItem.summary}
              </p>
            )}
          </div>

          <footer className="p-gutter-md md:p-gutter-lg border-t border-light-border dark:border-dark-border flex flex-wrap items-center justify-between gap-gutter-md">
            <div className="flex items-center gap-gutter-xs">
              {hasPagination && onPrev && onNext && (
                <>
                  <button
                    type="button"
                    onClick={onPrev}
                    className="inline-flex items-center justify-center gap-gutter-xs min-h-11 px-gutter-md py-gutter-sm border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-on-surface dark:text-dark-on-surface font-label text-label-sm uppercase rounded-none cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-on-primary dark:hover:text-dark-on-primary transition-colors duration-state-change"
                  >
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                      arrow_back
                    </span>
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="inline-flex items-center justify-center gap-gutter-xs min-h-11 px-gutter-md py-gutter-sm border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-on-surface dark:text-dark-on-surface font-label text-label-sm uppercase rounded-none cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-on-primary dark:hover:text-dark-on-primary transition-colors duration-state-change"
                  >
                    <span>Next</span>
                    <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                      arrow_forward
                    </span>
                  </button>
                </>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-gutter-sm ml-auto w-full sm:w-auto">
              <button
                id="modal-close-footer"
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center min-h-11 px-gutter-lg py-gutter-sm border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-on-surface dark:text-dark-on-surface font-label text-label-lg uppercase rounded-none cursor-pointer hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-on-primary dark:hover:text-dark-on-primary transition-colors duration-state-change"
              >
                Close
              </button>
              <a
                href={rawFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-gutter-xs flex-1 sm:flex-initial min-h-11 px-gutter-lg py-gutter-sm border border-light-border dark:border-dark-border bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary font-label text-label-lg uppercase rounded-none hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent hover:border-light-accent dark:hover:border-dark-accent transition-colors duration-state-change"
              >
                <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                  {isPdf ? 'picture_as_pdf' : 'open_in_new'}
                </span>
                <span>{isPdf ? 'Open Original PDF' : 'Open Image'}</span>
              </a>
              {documentItem.verifyUrl && (
                <a
                  href={documentItem.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-gutter-xs flex-1 sm:flex-initial min-h-11 px-gutter-lg py-gutter-sm border border-light-accent dark:border-dark-accent bg-light-accent dark:bg-dark-accent text-light-on-accent dark:text-dark-on-accent font-label text-label-lg uppercase rounded-none hover:opacity-90 transition-opacity duration-state-change"
                >
                  <span>Verify Source</span>
                  <span className="material-symbols-outlined text-body-md" aria-hidden="true">
                    arrow_outward
                  </span>
                </a>
              )}
            </div>
          </footer>
        </div>
      )}
    </dialog>
  );
}
