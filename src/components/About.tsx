import Image from "next/image";
import type { Site } from "@/data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const builtWith = ["Next.js", "TypeScript", "Tailwind CSS", "Motion"];

export function About({ site, index }: { site: Site; index: string }) {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:grid-cols-[5fr_7fr] md:gap-16 md:px-8 md:py-32">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
            {site.photo ? (
              <Image src={site.photo} alt={`Portrait of ${site.name}`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            ) : (
              <div className="hero-glow flex h-full items-center justify-center" aria-hidden>
                <span className="font-display text-[10rem] leading-none text-fg/10">P</span>
              </div>
            )}
          </div>
        </Reveal>

        <div>
          <SectionHeading index={index} title="About me" />
          <Reveal className="space-y-5 text-lg text-fg/85">
            {site.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>

          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-2">
            {site.clubs.map((c) => (
              <span key={c} className="rounded-full border border-line px-4 py-1.5 text-sm text-muted">
                {c}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-10 rounded-xl border border-line p-5 text-sm">
            <p className="text-muted">This website</p>
            <p className="mt-1">
              Designed and built by me with{" "}
              {builtWith.map((t, i) => (
                <span key={t}>
                  <span className="text-accent">{t}</span>
                  {i < builtWith.length - 2 ? ", " : i === builtWith.length - 2 ? " and " : "."}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
