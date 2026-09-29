import type { Site } from "@/data/site";

export function Footer({ site }: { site: Site }) {
  const socials = [
    site.instagram && { label: "Instagram", href: site.instagram },
    site.youtube && { label: "YouTube", href: site.youtube },
    site.github && { label: "GitHub", href: site.github },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-6">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p>
          Designed &amp; built by {site.shortName} with{" "}
          <a
            href={site.repo || site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-fg underline decoration-accent underline-offset-4 hover:text-accent"
          >
            Next.js
          </a>
        </p>
      </div>
    </footer>
  );
}
