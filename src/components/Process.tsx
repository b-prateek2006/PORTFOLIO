import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Process({ steps, index }: { steps: { title: string; text: string }[]; index: string }) {
  return (
    <section id="process" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <SectionHeading index={index} title="How it works" />
        <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12}>
              <li className="relative border-t border-line pt-6">
                <span aria-hidden className="absolute -top-px left-0 h-px w-12 bg-accent" />
                <p className="text-sm text-accent tabular-nums">Step {i + 1}</p>
                <h3 className="mt-2 font-display text-2xl uppercase">{step.title}</h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
