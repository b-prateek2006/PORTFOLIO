import { Reveal } from "./Reveal";

export function SectionHeading({ index, title, intro }: { index: string; title: string; intro?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="mb-3 text-sm tracking-[0.3em] text-accent">{index}</p>
      <h2 className="font-display text-5xl leading-none uppercase md:text-7xl">{title}</h2>
      {intro && <p className="mt-5 max-w-xl text-muted">{intro}</p>}
    </Reveal>
  );
}
