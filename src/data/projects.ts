/**
 * ============================================================================
 * PROJECT ARCHIVE REGISTRY
 * ============================================================================
 * How to add a new project in the future:
 * 1. (Optional) Drop a screenshot (.png, .jpg, .webp) or spec (.pdf) into:
 *      public/assets/aistudio/   (or public/projects/)
 * 2. Append a new entry to the `PROJECTS` array below.
 *
 * That's it!
 * - Project numbering (PRJ.01, PRJ.02, ...) updates automatically.
 * - Your first project pairs alongside the GitHub repository index; any
 *   additional projects automatically expand into a balanced grid below.
 * - Pass `previewImage` for screenshots/PDFs, or `pipeline` for system nodes.
 * ============================================================================
 */

export interface ProjectPipelineNode {
  step: string;
  layer: string;
  name: string;
  detail: string;
}

export interface ProjectAction {
  label: string;
  href: string;
  variant?: 'secondary' | 'accent' | 'primary';
  external?: boolean;
}

export interface ProjectItem {
  /** Unique identifier */
  id: string;
  /** Short category/type tag shown next to PRJ.XX (e.g. 'PROPOSED ARCHITECTURE', 'FULL-STACK APP') */
  tag: string;
  /** Project title */
  title: string;
  /** Concise technical summary */
  description: string;
  /** Technologies / stack tags */
  stack: string[];
  /** Status text displayed in the card footer */
  status: string;
  /** Optional screenshot or PDF preview path inside `public/` */
  previewImage?: {
    src: string;
    alt: string;
    caption?: string;
    pageNumber?: number;
  };
  /** Optional structured architecture pipeline diagram */
  pipeline?: {
    title: string;
    badge: string;
    nodes: ProjectPipelineNode[];
  };
  /** Action links/buttons shown in card footer */
  actions: ProjectAction[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'prj-idm-vton',
    tag: 'PROPOSED ARCHITECTURE',
    title: 'IDM-VTON E-Commerce Virtual Try-On Architecture',
    description:
      'A MERN-stack e-commerce system architecture designed to integrate a pretrained IDM-VTON diffusion model via a decoupled Python/PyTorch inference queue—bridging storefront requests, garment preprocessing, and virtual try-on generation.',
    stack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Redis / BullMQ',
      'PyTorch',
      'IDM-VTON',
    ],
    status: 'STATUS: PROPOSED SYSTEM ARCHITECTURE',
    pipeline: {
      title: 'SYSTEM PIPELINE',
      badge: 'ASYNC QUEUE',
      nodes: [
        {
          step: '01',
          layer: 'CLIENT TIER',
          name: 'React Storefront',
          detail: 'Garment & person photo intake, status polling',
        },
        {
          step: '02',
          layer: 'ORCHESTRATION',
          name: 'Node.js + BullMQ',
          detail: 'REST validation, async job queue & rate limits',
        },
        {
          step: '03',
          layer: 'GPU INFERENCE',
          name: 'Python / IDM-VTON',
          detail: 'Decoupled diffusion try-on worker pool',
        },
        {
          step: '04',
          layer: 'PERSISTENCE',
          name: 'MongoDB',
          detail: 'Accounts, catalog metadata & job state tracking',
        },
      ],
    },
    actions: [
      {
        label: 'Read Spec',
        href: '#research',
        variant: 'secondary',
        external: false,
      },
      {
        label: 'Original PDF',
        href: '/assets/aistudio/Research_Paper_a978f2d7.pdf',
        variant: 'accent',
        external: true,
      },
    ],
  },
];
