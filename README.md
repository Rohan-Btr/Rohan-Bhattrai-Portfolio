# Rohan Bhattrai (Rohan Btr) — Personal Portfolio

A Digital Brutalism portfolio built with React, TypeScript, Tailwind CSS v4, and `pdfjs-dist` so certificates and research papers stored as local PDFs or images render crisp previews directly in the browser with zero external image dependencies.

## Running Locally

```bash
npm install --legacy-peer-deps
npm run dev
```

Open **http://localhost:3000** in your browser.

## Adding New Certificates (2 Steps)

1. Put your certificate file (`.pdf`, `.png`, `.jpg`, or `.webp`) inside `public/assets/aistudio/` (or a `public/certificates/` folder).
2. Open `src/data/certificates.ts` and append one object to `CERTIFICATES`:

```ts
{
  id: 'my-new-cert',
  category: 'systems',        // existing slug or a brand new one!
  categoryLabel: 'Systems & IoT',
  issuer: 'NPTEL',
  date: 'JAN 2027',
  title: 'Course Title — 90%',
  credentialId: 'CERT-ID-1234',
  file: '/assets/aistudio/my_new_cert.pdf',
  verifyUrl: 'https://...',
}
```

- Filter tabs, counts, and `ARC.XX` numbers update automatically.
- PDFs automatically render page 1 as the card preview and link to the raw PDF file.

## Adding New Projects

Open `src/data/projects.ts` and append a new object to `PROJECTS`:

```ts
{
  id: 'my-new-project',
  tag: 'FULL-STACK APP',
  title: 'Project Name',
  description: 'What it solves and how it is architected.',
  stack: ['React', 'Node.js', 'MongoDB'],
  status: 'STATUS: DEPLOYED',
  previewImage: {
    src: '/assets/aistudio/my_project.png', // optional screenshot or PDF in public/
    alt: 'Project preview',
  },
  actions: [
    { label: 'Live Demo', href: 'https://...', variant: 'accent', external: true },
    { label: 'GitHub', href: 'https://github.com/Rohan-Btr/...', external: true },
  ],
}
```

- `PRJ.01`, `PRJ.02`, ... numbering and responsive grid borders update automatically.

## Hosting Live

Build the static bundle:

```bash
npm run build
```

Deploy the generated `dist/` directory to any static host:
- **Vercel / Netlify / Cloudflare Pages**: Build command `npm run build`, output directory `dist`. (If npm complains about peer dependencies during CI install, set install command to `npm install --legacy-peer-deps`.)
- **GitHub Pages**: Works with `base` configured in `vite.config.ts` because all local assets use `resolveAssetUrl()`.
