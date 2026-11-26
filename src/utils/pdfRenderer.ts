import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { resolveAssetUrl } from './assetUrl';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const renderedPageCache = new Map<string, string>();
const inflightRenderCache = new Map<string, Promise<string>>();

export interface RenderPdfOptions {
  src: string;
  pageNumber?: number;
  maxDimension?: number;
  rotation?: 0 | 90 | 180 | 270;
}

export async function renderPdfPageToUrl({
  src,
  pageNumber = 1,
  maxDimension = 1400,
  rotation = 0,
}: RenderPdfOptions): Promise<string> {
  const resolvedSrc = resolveAssetUrl(src);
  const cacheKey = `${resolvedSrc}::p=${pageNumber}::m=${maxDimension}::r=${rotation}`;

  const cached = renderedPageCache.get(cacheKey);
  if (cached) return cached;

  const inflight = inflightRenderCache.get(cacheKey);
  if (inflight) return inflight;

  const task = (async () => {
    const loadingTask = pdfjsLib.getDocument({
      url: resolvedSrc,
      wasmUrl: resolveAssetUrl('/pdfjs/wasm/'),
      cMapUrl: resolveAssetUrl('/pdfjs/cmaps/'),
      cMapPacked: true,
      standardFontDataUrl: resolveAssetUrl('/pdfjs/standard_fonts/'),
    });
    const pdf = await loadingTask.promise;

    const clampedPage = Math.max(1, Math.min(pageNumber, pdf.numPages));
    const page = await pdf.getPage(clampedPage);
    const finalRotation = (page.rotate + rotation) % 360;

    // Normalize scale to target max pixel dimension so oversized vector PDFs
    // (like 9944x7030pt Binance certificates) never exceed browser canvas limits.
    const baseViewport = page.getViewport({ scale: 1, rotation: finalRotation });
    const longestSide = Math.max(baseViewport.width, baseViewport.height, 1);
    const adaptiveScale = Math.min(3, Math.max(0.05, maxDimension / longestSide));
    const viewport = page.getViewport({ scale: adaptiveScale, rotation: finalRotation });

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.ceil(viewport.width));
    canvas.height = Math.max(1, Math.ceil(viewport.height));

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not obtain 2D canvas context');
    }

    context.fillStyle = '#FFFFFF';
    context.fillRect(0, 0, canvas.width, canvas.height);

    await page.render({
      canvas,
      canvasContext: context,
      viewport,
    }).promise;

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) resolve(result);
          else reject(new Error('Failed to encode PDF page to image'));
        },
        'image/png',
        0.95
      );
    });

    const objectUrl = URL.createObjectURL(blob);
    renderedPageCache.set(cacheKey, objectUrl);

    try {
      await loadingTask.destroy();
    } catch {
      // Ignore cleanup errors
    }

    return objectUrl;
  })();

  inflightRenderCache.set(cacheKey, task);

  try {
    return await task;
  } finally {
    inflightRenderCache.delete(cacheKey);
  }
}
