/**
 * Resolves a local public asset path against Vite's configured BASE_URL
 * so assets work cleanly on both root domains (Vercel/Netlify) and subpath hosts (GitHub Pages).
 */
export function resolveAssetUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${cleanBase}${cleanPath}`;
}

export function isPdfPath(path: string): boolean {
  if (!path) return false;
  const clean = path.split(/[?#]/)[0].toLowerCase();
  return clean.endsWith('.pdf');
}
