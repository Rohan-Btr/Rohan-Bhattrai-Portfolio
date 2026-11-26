import { PROJECTS, ProjectItem } from '../data/portfolioData';
import { resolveAssetUrl } from '../utils/assetUrl';
import { ResilientImage } from './ResilientImage';

function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function resolveActionHref(href: string): string {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return resolveAssetUrl(href);
  }
  return href;
}

function ProjectCard({
  project,
  index,
  className = '',
}: {
  project: ProjectItem;
  index: number;
  className?: string;
}) {
  const hasVisualPanel = Boolean(project.pipeline || project.previewImage);

  return (
    <article
      className={`p-gutter-md md:p-gutter-xl bg-light-surface dark:bg-dark-surface flex flex-col justify-between gap-gutter-lg ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-lg items-start">
        <div
          className={`${
            hasVisualPanel ? 'md:col-span-7' : 'md:col-span-12'
          } flex flex-col gap-gutter-md`}
        >
          <span className="font-label text-label-sm text-light-accent dark:text-dark-accent uppercase tabular-nums">
            PRJ.{pad2(index + 1)} // {project.tag}
          </span>
          <h3 className="font-headline text-headline-md uppercase text-balance">
            {project.title}
          </h3>
          <p className="font-body text-body-md text-light-secondary dark:text-dark-secondary text-pretty">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-gutter-xs pt-gutter-xs">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-gutter-sm py-gutter-xs border border-light-border dark:border-dark-border rounded-none font-label text-label-sm uppercase whitespace-nowrap shrink-0"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.pipeline && (
          <div className="md:col-span-5 border border-light-border dark:border-dark-border rounded-none bg-light-surface-alt dark:bg-dark-surface-alt p-gutter-sm flex flex-col gap-gutter-xs">
            <div className="flex items-center justify-between pb-gutter-xs border-b border-light-border dark:border-dark-border">
              <span className="font-label text-label-sm uppercase">
                {project.pipeline.title}
              </span>
              <span className="font-label text-label-sm text-light-accent dark:text-dark-accent uppercase">
                {project.pipeline.badge}
              </span>
            </div>
            <div className="flex flex-col gap-gutter-xs">
              {project.pipeline.nodes.map((node) => (
                <div
                  key={node.step}
                  className="border border-light-border dark:border-dark-border rounded-none bg-light-surface dark:bg-dark-surface p-gutter-sm"
                >
                  <div className="flex items-center justify-between gap-gutter-xs">
                    <span className="font-label text-label-sm text-light-accent dark:text-dark-accent uppercase tabular-nums">
                      {node.step} // {node.layer}
                    </span>
                  </div>
                  <div className="font-title text-body-md font-semibold uppercase mt-gutter-xs">
                    {node.name}
                  </div>
                  <p className="font-body text-label-sm text-light-secondary dark:text-dark-secondary">
                    {node.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!project.pipeline && project.previewImage && (
          <div className="md:col-span-5 border border-light-border dark:border-dark-border rounded-none bg-light-surface-alt dark:bg-dark-surface-alt p-gutter-xs">
            <ResilientImage
              src={project.previewImage.src}
              pageNumber={project.previewImage.pageNumber}
              alt={project.previewImage.alt}
              fallbackTitle={project.title}
              fallbackMeta={project.tag}
              className="w-full h-56 object-cover object-top bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-none"
            />
            {project.previewImage.caption && (
              <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase block mt-gutter-xs">
                {project.previewImage.caption}
              </span>
            )}
          </div>
        )}
      </div>

      <footer className="border-t border-light-border dark:border-dark-border pt-gutter-md flex flex-wrap items-center justify-between gap-gutter-md">
        <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase">
          {project.status}
        </span>
        <div className="flex flex-wrap w-full sm:w-auto gap-gutter-sm">
          {project.actions.map((action) => {
            const variantClasses =
              action.variant === 'accent'
                ? 'bg-light-accent dark:bg-dark-accent text-light-on-accent dark:text-dark-on-accent border-light-accent dark:border-dark-accent hover:opacity-90 transition-opacity duration-state-change'
                : action.variant === 'primary'
                  ? 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary border-light-border dark:border-dark-border hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent hover:border-light-accent dark:hover:border-dark-accent transition-colors duration-state-change'
                  : 'border-light-border dark:border-dark-border hover:bg-light-primary dark:hover:bg-dark-primary hover:text-light-on-primary dark:hover:text-dark-on-primary transition-colors duration-state-change';

            return (
              <a
                key={`${project.id}-${action.label}`}
                href={resolveActionHref(action.href)}
                target={action.external ? '_blank' : undefined}
                rel={action.external ? 'noopener noreferrer' : undefined}
                className={`inline-flex items-center justify-center flex-1 sm:flex-initial min-h-11 px-gutter-md py-gutter-sm border rounded-none font-label text-label-lg uppercase whitespace-nowrap shrink-0 ${variantClasses}`}
              >
                {action.label}
              </a>
            );
          })}
        </div>
      </footer>
    </article>
  );
}

export function WorkSection() {
  const featuredProject = PROJECTS[0];
  const additionalProjects = PROJECTS.slice(1);

  return (
    <section id="work" className="border-b border-light-border dark:border-dark-border">
      <div className="p-gutter-md md:p-gutter-xl border-b border-light-border dark:border-dark-border flex flex-wrap items-center justify-between gap-gutter-md">
        <div className="flex items-baseline gap-gutter-md">
          <span className="font-section text-section-num-mobile md:text-section-num text-light-accent dark:text-dark-accent tabular-nums">
            04
          </span>
          <h2 className="font-headline text-headline-lg-mobile md:text-headline-lg uppercase">
            VERIFIED WORK &amp; SYSTEMS.
          </h2>
        </div>
        <span className="font-label text-label-sm text-light-secondary dark:text-dark-secondary uppercase">
          AUTHENTIC ENGINEERING ARCHIVE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {featuredProject && (
          <ProjectCard
            project={featuredProject}
            index={0}
            className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border"
          />
        )}

        {/* GitHub Repository Index */}
        <div
          className={`${
            featuredProject ? 'lg:col-span-4' : 'lg:col-span-12'
          } p-gutter-md md:p-gutter-xl bg-light-surface-alt dark:bg-dark-surface-alt flex flex-col justify-between gap-gutter-lg`}
        >
          <div className="flex flex-col gap-gutter-md">
            <span className="font-label text-label-sm text-light-primary dark:text-dark-accent uppercase">
              SOURCE CODE // GITHUB
            </span>
            <h3 className="font-headline text-headline-md uppercase">ROHAN-BTR REPOSITORIES</h3>
            <p className="font-body text-body-md text-light-secondary dark:text-dark-secondary text-pretty">
              All active codebases, coursework implementations, and full-stack experiments are maintained directly on GitHub—no fabricated demos or synthetic screenshots.
            </p>
          </div>
          <a
            href="https://github.com/Rohan-Btr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between gap-gutter-sm min-h-11 px-gutter-lg py-gutter-md bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary border border-light-border dark:border-dark-border rounded-none font-label text-label-lg uppercase hover:bg-light-accent dark:hover:bg-dark-accent hover:text-light-on-accent dark:hover:text-dark-on-accent hover:border-light-accent dark:hover:border-dark-accent transition-colors duration-state-change"
          >
            <span className="truncate">Visit GitHub.com/Rohan-Btr</span>
            <span className="material-symbols-outlined text-title-md shrink-0" aria-hidden="true">
              arrow_outward
            </span>
          </a>
        </div>
      </div>

      {additionalProjects.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-light-border dark:border-dark-border">
          {additionalProjects.map((project, offsetIdx) => {
            const isLast = offsetIdx === additionalProjects.length - 1;
            const isOddOrphan = isLast && additionalProjects.length % 2 === 1;
            const isLeftCol = offsetIdx % 2 === 0;
            const borderClasses = [
              !isLast ? 'border-b lg:border-b-0' : '',
              !isOddOrphan && additionalProjects.length >= 2 && offsetIdx < additionalProjects.length - 2
                ? 'lg:border-b'
                : '',
              !isOddOrphan && isLeftCol ? 'lg:border-r' : '',
              'border-light-border dark:border-dark-border',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <ProjectCard
                key={project.id}
                project={project}
                index={offsetIdx + 1}
                className={`${isOddOrphan ? 'lg:col-span-2' : ''} ${borderClasses}`}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
