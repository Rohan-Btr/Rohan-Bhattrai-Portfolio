/**
 * ============================================================================
 * CERTIFICATE ARCHIVE REGISTRY
 * ============================================================================
 * How to add a new certificate in the future:
 * 1. Drop your certificate file (.pdf, .png, .jpg, or .webp) into:
 *      public/assets/aistudio/   (or public/certificates/)
 * 2. Append a new entry to the `CERTIFICATES` array below.
 *
 * That's it!
 * - Category filter tabs and counts update automatically.
 * - Archive numbering (ARC.01, ARC.02, ...) updates automatically.
 * - PDFs automatically render their first page as a crisp card preview
 *   and link directly to the full PDF file.
 * ============================================================================
 */

export interface CertificateItem {
  /** Unique identifier */
  id: string;
  /** Category slug used for filtering (e.g. 'systems', 'blockchain', 'research', or any new slug) */
  category: string;
  /** Display label for the category filter tab */
  categoryLabel: string;
  /** Issuing organization */
  issuer: string;
  /** Issue date or period */
  date: string;
  /** Certificate title */
  title: string;
  /** Roll number, credential ID, or registration info */
  credentialId: string;
  /** Path inside `public/` (supports .pdf, .png, .jpg, .webp) */
  file: string;
  /** Optional external verification link */
  verifyUrl?: string;
  /** Optional clockwise rotation in degrees (useful for sideways-scanned PDFs) */
  rotation?: 0 | 90 | 180 | 270;
}

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-iot',
    category: 'systems',
    categoryLabel: 'Systems & IoT',
    issuer: 'NPTEL',
    date: 'JUL–OCT 2026',
    title: 'Introduction to Internet of Things — 84%',
    credentialId: 'ROLL: NPTEL26CS161MANUAL0006303',
    file: '/assets/aistudio/IOT_Certificate_a0b4c9b7.pdf',
    verifyUrl: 'https://beta.nptel.ac.in/verify/NOC-0MB7-459Z-W5FZW',
  },
  {
    id: 'cert-cn',
    category: 'systems',
    categoryLabel: 'Systems & IoT',
    issuer: 'NPTEL',
    date: 'JAN–APR 2025',
    title: 'Computer Networks & Internet Protocol — 61%',
    credentialId: 'ROLL: NPTEL25CS15S759700290',
    file: '/assets/aistudio/Computer_Network_31bf3528.pdf',
    verifyUrl:
      'https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs15/Course/NPTEL25CS15S75970029004264080.pdf',
  },
  {
    id: 'cert-tutedude',
    category: 'blockchain',
    categoryLabel: 'Blockchain',
    issuer: 'TUTEDUDE',
    date: '03 OCT 2026',
    title: 'Tutedude — Blockchain',
    credentialId: 'CERT ID: TD-ZAW-BC-1740',
    file: '/assets/aistudio/Blockchain_certificate_TuteDude_ed96b59b.pdf',
    verifyUrl: 'https://upskill.tutedude.com/certificate/TD-ZAW%20-BC-1740',
  },
  {
    id: 'cert-binance-tee',
    category: 'blockchain',
    categoryLabel: 'Blockchain',
    issuer: 'BINANCE × MARLIN',
    date: 'NOV 2026',
    title: 'Offchain Computing Using TEE Coprocessors',
    credentialId: 'BINANCE ACADEMY × MARLIN (QR VERIFIED)',
    file: '/assets/aistudio/Off_chain_Blockchain_certificate_fdf70474.pdf',
    verifyUrl:
      'https://www.binance.com/en/academy/courses/certificate/a14c5a60c695ba34ea3c027887a9a6e59f9ba8d531cb6962c44197bda089431c',
  },
  {
    id: 'cert-binance-onchain',
    category: 'blockchain',
    categoryLabel: 'Blockchain',
    issuer: 'BINANCE ACADEMY',
    date: 'NOV 2026',
    title: 'On-Chain Analysis for Beginners',
    credentialId: 'BINANCE ACADEMY (QR VERIFIED)',
    file: '/assets/aistudio/On_chain_analysis_beginner_28ba743e.pdf',
    verifyUrl:
      'https://www.binance.com/en/academy/courses/certificate/87916025f3c4e9ded92f9eb616270809474812e0b6327d3b3a826f798fd6de37',
  },
  {
    id: 'cert-ijrti',
    category: 'research',
    categoryLabel: 'Research',
    issuer: 'IJRTI',
    date: 'SEP 2026',
    title: 'IJRTI — Research Publication Certificate',
    credentialId: 'PAPER ID: IJRTI2609363 // REG: 300762',
    file: '/assets/aistudio/Certificate_Zaw_23b0c21e.pdf',
    verifyUrl:
      'https://ijrti.org/author_details.php?name=ZAW+MOE+HEIN&slot=4&paper=IJRTI2609363',
    rotation: 90,
  },
];
