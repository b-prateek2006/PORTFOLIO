import type { Site } from "@/data/site";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";

export function Contact({ site, services, index }: { site: Site; services: string[]; index: string }) {
  // Only links you have filled in site.ts are shown.
  const direct = [
    site.whatsapp && { label: "WhatsApp", value: "Chat now", href: `https://wa.me/${site.whatsapp}` },
    site.email && { label: "Email", value: site.email, href: `mailto:${site.email}` },
    site.instagram && { label: "Instagram", value: "Follow my work", href: site.instagram },
    site.youtube && { label: "YouTube", value: "Watch more", href: site.youtube },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:grid-cols-2 md:gap-16 md:px-8 md:py-32">
        <Reveal>
          <p className="mb-3 text-sm tracking-[0.3em] text-accent">{index}</p>
          <h2 className="font-display text-6xl leading-[0.9] uppercase md:text-8xl">
            Let&apos;s make
            <br />
            something<span className="text-accent">.</span>
          </h2>
          <p className="mt-6 max-w-md text-muted">
            Tell me about your project: what you need, when, and your budget.
          </p>
          {direct.length > 0 && (
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {direct.map((d) => (
                <li key={d.label}>
                  <a
                    href={d.href}
                    target={d.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4"
                  >
                    <span className="text-sm text-muted">{d.label}</span>
                    <span className="transition-colors group-hover:text-accent">{d.value} →</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal delay={0.15}>
          <ContactForm services={services} />
        </Reveal>
      </div>
    </section>
  );
}
