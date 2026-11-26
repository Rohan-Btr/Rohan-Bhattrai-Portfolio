import { useEffect, useState } from 'react';
import { isPdfPath, resolveAssetUrl } from '../utils/assetUrl';
import { renderPdfPageToUrl } from '../utils/pdfRenderer';

interface ResilientImageProps {
  src: string;
  alt: string;
  pageNumber?: number;
  maxDimension?: number;
  rotation?: 0 | 90 | 180 | 270;
  className?: string;
  fallbackTitle?: string;
  fallbackMeta?: string;
}

export function ResilientImage({
  src,
  alt,
  pageNumber = 1,
  maxDimension = 1400,
  rotation = 0,
  className = '',
  fallbackTitle,
  fallbackMeta,
}: ResilientImageProps) {
  const isPdf = isPdfPath(src);
  const [resolvedUrl, setResolvedUrl] = useState<string>(() =>
    isPdf ? '' : resolveAssetUrl(src)
  );
  const [isLoading, setIsLoading] = useState<boolean>(isPdf);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    setHasError(false);

    if (!src) {
      setResolvedUrl('');
      setIsLoading(false);
      setHasError(true);
      return;
    }

    if (!isPdf) {
      setResolvedUrl(resolveAssetUrl(src));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    renderPdfPageToUrl({
      src,
      pageNumber,
      maxDimension,
      rotation,
    })
      .then((url) => {
        if (!cancelled) {
          setResolvedUrl(url);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setHasError(true);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [src, isPdf, pageNumber, maxDimension, rotation]);

  if (isLoading) {
    return (
      <div
        role="img"
        aria-label={`Loading ${alt}`}
        className={`flex flex-col items-center justify-center p-gutter-md bg-light-surface-alt dark:bg-dark-surface-alt border border-light-border dark:border-dark-border rounded-none text-center ${className}`}
      >
        <span
          className="material-symbols-outlined text-headline-md text-light-accent dark:text-dark-accent mb-gutter-xs"
          aria-hidden="true"
        >
          picture_as_pdf
        </span>
        <span className="font-label text-label-sm uppercase text-light-secondary dark:text-dark-secondary">
          Rendering Document...
        </span>
      </div>
    );
  }

  if (hasError || !resolvedUrl) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center p-gutter-md bg-light-surface-alt dark:bg-dark-surface-alt border border-light-border dark:border-dark-border rounded-none text-center ${className}`}
      >
        <span
          className="material-symbols-outlined text-headline-md text-light-accent dark:text-dark-accent mb-gutter-xs"
          aria-hidden="true"
        >
          description
        </span>
        <span className="font-title text-title-md uppercase text-light-on-surface dark:text-dark-on-surface text-balance">
          {fallbackTitle || alt}
        </span>
        {fallbackMeta && (
          <span className="font-label text-label-sm uppercase text-light-secondary dark:text-dark-secondary mt-gutter-xs">
            {fallbackMeta}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={resolvedUrl}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
