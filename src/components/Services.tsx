import type { Service } from "@/data/types";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Services({ services, index }: { services: Service[]; index: string }) {
  return (
    <section id="services" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <SectionHeading index={index} title="Services" intro="From one reel to a full shoot. Tell me what you need." />
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <article className="group flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent/60 md:p-8">
                <span className="font-display text-5xl text-line transition-colors duration-500 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-3xl uppercase">{s.title}</h3>
                <p className="mt-3 text-muted">{s.blurb}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {s.includes.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                      {line}
                    </li>
                  ))}
                </ul>
                {(s.turnaround || s.price) && (
                  <dl className="mt-auto flex gap-8 border-t border-line pt-5 text-sm">
                    {s.turnaround && (
                      <div>
                        <dt className="text-muted">Turnaround</dt>
                        <dd>{s.turnaround}</dd>
                      </div>
                    )}
                    {s.price && (
                      <div>
                        <dt className="text-muted">Price</dt>
                        <dd className="text-accent">{s.price}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
