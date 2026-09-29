// Opening title card: your name slides up, then the screen wipes away.
// Pure CSS (see .intro in globals.css), so it never blocks the page even if
// JavaScript is slow. Plays once per browser session.
export function Intro({ name }: { name: string }) {
  return (
    <div aria-hidden className="intro fixed inset-0 z-[80] flex items-center justify-center bg-bg">
      <div className="overflow-hidden">
        <span className="intro-text block font-display text-6xl tracking-wide uppercase md:text-8xl">
          {name}
          <span className="text-accent">.</span>
        </span>
      </div>
    </div>
  );
}
