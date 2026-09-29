// Stand-in artwork for sample entries (and pieces with no thumbnail yet).
const gradients = [
  "from-amber-500/40 via-orange-900/30 to-black",
  "from-rose-500/30 via-stone-900/40 to-black",
  "from-sky-500/25 via-slate-900/40 to-black",
  "from-emerald-500/25 via-zinc-900/40 to-black",
  "from-violet-500/30 via-neutral-900/40 to-black",
];

export function Placeholder({ seed, label }: { seed: number; label: string }) {
  return (
    <span
      aria-hidden
      className={`absolute inset-0 flex items-center justify-center bg-linear-to-br ${gradients[seed % gradients.length]}`}
    >
      <span className="font-display text-2xl tracking-widest text-fg/25 uppercase">{label}</span>
    </span>
  );
}
