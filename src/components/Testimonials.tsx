import type { Testimonial } from "@/data/types";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Hidden completely until testimonials.ts has at least one real quote.
export function Testimonials({ testimonials, index }: { testimonials: Testimonial[]; index: string }) {
  if (testimonials.length === 0) return null;
  return (
    <section id="testimonials" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <SectionHeading index={index} title="Kind words" />
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={t.name + i} delay={i * 0.1}>
              <figure className="h-full rounded-xl border border-line bg-surface p-6 md:p-8">
                <blockquote className="text-lg leading-relaxed md:text-xl">
                  <span className="font-display text-4xl text-accent" aria-hidden>
                    “
                  </span>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium">{t.name}</span>
                  {t.role && <span className="text-muted"> · {t.role}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
