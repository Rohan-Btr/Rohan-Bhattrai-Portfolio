export type { CertificateItem } from './certificates';
export { CERTIFICATES } from './certificates';
export type { ProjectAction, ProjectItem, ProjectPipelineNode } from './projects';
export { PROJECTS } from './projects';

export interface NavLinkItem {
  label: string;
  drawerLabel: string;
  href: string;
}

export interface JourneyMilestone {
  year: string;
  markerStyle: 'accent' | 'outline' | 'primary';
  meta: string;
  title: string;
  description: string;
}

export interface SkillGroup {
  index: string;
  title: string;
  items: string;
}

export interface DocumentPage {
  label: string;
  file: string;
  pageNumber?: number;
  rotation?: 0 | 90 | 180 | 270;
  alt: string;
}

export interface DocumentViewerItem {
  title: string;
  meta: string;
  file: string;
  pageNumber?: number;
  rotation?: 0 | 90 | 180 | 270;
  pages?: DocumentPage[];
  verifyUrl?: string;
  summary?: string;
}

export const PORTFOLIO_IMAGES = {
  portrait: '/assets/aistudio/My_Profile_e41c89a3.png',
  researchPaperPdf: '/assets/aistudio/Research_Paper_a978f2d7.pdf',
};

export const NAV_LINKS: NavLinkItem[] = [
  { label: 'About', drawerLabel: '01 / About', href: '#about' },
  { label: 'Journey', drawerLabel: '02 / Journey', href: '#journey' },
  { label: 'Skills', drawerLabel: '03 / Skills', href: '#skills' },
  { label: 'Work', drawerLabel: '04 / Work', href: '#work' },
  { label: 'Research', drawerLabel: '05 / Research', href: '#research' },
  { label: 'Certificates', drawerLabel: '06 / Certificates', href: '#certificates' },
  { label: 'Contact', drawerLabel: '07 / Contact', href: '#contact' },
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    year: '2023',
    markerStyle: 'accent',
    meta: '2023 — MAY 2027 // PARUL UNIVERSITY',
    title: 'B.Tech Computer Science & Engineering',
    description:
      'Started B.Tech CSE at Parul University, Vadodara, Gujarat. Expected graduation: May 2027.',
  },
  {
    year: '2025',
    markerStyle: 'outline',
    meta: 'JAN — APR 2025 // NPTEL',
    title: 'Computer Networks & Internet Protocol',
    description:
      'Completed 12-week NPTEL coursework with a verified score of 61%, strengthening core networking and protocol foundations.',
  },
  {
    year: '2026',
    markerStyle: 'accent',
    meta: 'SEP 2026 // IJRTI PUBLICATION',
    title: 'IDM-VTON MERN Research',
    description:
      'Co-authored and published in IJRTI Vol. 11, Issue 9 under Prof. Ankita Verma at Parul Institute of Engineering & Technology.',
  },
  {
    year: '2026',
    markerStyle: 'primary',
    meta: 'OCT — NOV 2026 // SYSTEMS & WEB3',
    title: 'IoT (84%) & Web3 Track',
    description:
      'Completed NPTEL Introduction to IoT (84%), Tutedude Blockchain, and Binance Academy tracks on On-Chain Analysis and TEE Coprocessors.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    index: '01 / FRONTEND',
    title: 'Interface & Client',
    items: 'HTML / CSS / JavaScript / React',
  },
  {
    index: '02 / BACKEND',
    title: 'Server & APIs',
    items: 'Node.js / Express.js',
  },
  {
    index: '03 / DATABASE',
    title: 'Data Persistence',
    items: 'MongoDB',
  },
  {
    index: '04 / FOUNDATIONS',
    title: 'Systems & Protocols',
    items: 'Computer Networks / Internet Protocol / IoT',
  },
  {
    index: '05 / BLOCKCHAIN',
    title: 'Decentralized Compute',
    items: 'Blockchain Fundamentals / On-chain Analysis / TEE Coprocessors',
  },
  {
    index: '06 / EMERGING TECHNOLOGY',
    title: 'Applied Intelligence',
    items: 'Diffusion Models / IDM-VTON / AI Integration',
  },
];

export const RESEARCH_PAPER_DOCUMENT: DocumentViewerItem = {
  title: 'IJRTI Research Paper — IDM-VTON MERN Architecture',
  meta: 'IJRTI VOL. 11, ISSUE 9 // SEPTEMBER 2026 // PAPER ID: IJRTI2609363',
  file: PORTFOLIO_IMAGES.researchPaperPdf,
  pageNumber: 1,
  verifyUrl: 'https://ijrti.org/author_details.php?name=ZAW+MOE+HEIN&slot=4&paper=IJRTI2609363',
  summary:
    'Integrating Diffusion-Based Virtual Try-On into an E-Commerce Platform: A MERN-Stack Architecture Using IDM-VTON. Co-authored by Kishan Kushwaha, Krishna Thakur, Zaw Moe Hein, and Hariom Paswan under Prof. Ankita Verma.',
  pages: [
    {
      label: 'PAGE 01 // COVER',
      file: PORTFOLIO_IMAGES.researchPaperPdf,
      pageNumber: 1,
      alt: 'Research paper page 1 cover',
    },
    {
      label: 'PAGE 02 // REVIEW',
      file: PORTFOLIO_IMAGES.researchPaperPdf,
      pageNumber: 2,
      alt: 'Research paper page 2 literature review',
    },
    {
      label: 'PAGE 03 // ARCHITECTURE',
      file: PORTFOLIO_IMAGES.researchPaperPdf,
      pageNumber: 3,
      alt: 'Research paper page 3 proposed system architecture',
    },
    {
      label: 'PAGE 04 // WORKFLOW',
      file: PORTFOLIO_IMAGES.researchPaperPdf,
      pageNumber: 4,
      alt: 'Research paper page 4 workflow and evaluation',
    },
    {
      label: 'PAGE 05 // REFERENCES',
      file: PORTFOLIO_IMAGES.researchPaperPdf,
      pageNumber: 5,
      alt: 'Research paper page 5 references',
    },
  ],
};
