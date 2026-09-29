"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import type { WorkItem } from "@/data/types";
import { parseVideo } from "@/lib/video";
import { lockScroll } from "@/lib/lenis";
import { Placeholder } from "./Placeholder";

type Props = {
  items: WorkItem[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

// Full-screen viewer for one piece of work. The video player only loads when
// opened (keeps the page fast). Keyboard: Esc closes, arrow keys move.
// Phone: swipe left / right.
export function Lightbox({ items, index, onClose, onChange }: Props) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;
  const item = index === null ? null : items[index];

  useEffect(() => setMounted(true), []);

  // While open: freeze the page, make it unreachable by keyboard, focus the
  // close button. On close: undo all that and return focus to the card.
  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const site = document.getElementById("site");
    site?.setAttribute("inert", "");
    lockScroll(true);
    closeRef.current?.focus();
    return () => {
      site?.removeAttribute("inert");
      lockScroll(false);
      previousFocus?.focus();
    };
  }, [isOpen]);

  const go = (step: number) => {
    if (index === null || items.length < 2) return;
    onChange((index + step + items.length) % items.length);
  };

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (items.length < 2) return;
      if (e.key === "ArrowRight") onChange((index + 1) % items.length);
      if (e.key === "ArrowLeft") onChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onChange]);

  if (!mounted) return null;

  const meta = item ? [item.client, item.year].filter(Boolean).join(" · ") : "";

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          className="fixed inset-0 z-[60] flex flex-col bg-black/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          data-lenis-prevent
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div className="min-w-0">
              <p className="truncate font-medium">{item.title}</p>
              {meta && <p className="text-sm text-muted">{meta}</p>}
            </div>
            <div className="flex items-center gap-4">
              {items.length > 1 && (
                <span className="text-sm text-muted tabular-nums">
                  {index! + 1} / {items.length}
                </span>
              )}
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="flex size-10 items-center justify-center rounded-full border border-line transition-colors hover:border-fg"
              >
                <svg viewBox="0 0 24 24" className="size-5 stroke-fg" fill="none" strokeWidth="1.5" aria-hidden>
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 md:px-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                className="flex h-full w-full items-center justify-center"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
                drag={items.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
              >
                <Media item={item} index={index!} />
              </motion.div>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <NavButton side="left" onClick={() => go(-1)} />
                <NavButton side="right" onClick={() => go(1)} />
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Media({ item, index }: { item: WorkItem; index: number }) {
  const video = parseVideo(item.video);

  if (video) {
    const vertical = item.category === "reel" || video.provider === "instagram";
    return (
      <div
        className={`overflow-hidden rounded-lg bg-surface ${
          vertical ? "aspect-[9/16] w-[min(100%,45vh)]" : "aspect-video w-[min(100%,140vh,72rem)]"
        }`}
      >
        <iframe
          src={video.embedUrl}
          title={item.title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  if (item.image) {
    return (
      <div className="relative h-full w-full">
        <Image src={item.image} alt={item.title} fill sizes="100vw" className="pointer-events-none object-contain" />
      </div>
    );
  }

  // Sample / not-yet-linked piece.
  return (
    <div className="relative flex aspect-video w-[min(100%,72rem)] items-center justify-center overflow-hidden rounded-lg">
      <Placeholder seed={index} label="" />
      <p className="relative px-6 text-center text-sm text-fg/70">
        Add a <code className="text-accent">video</code> link or <code className="text-accent">image</code> for this piece
        in <code className="text-accent">src/data/work.ts</code>
      </p>
    </div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-black/50 transition-colors hover:border-fg md:flex ${
        side === "left" ? "left-4" : "right-4"
      }`}
    >
      <svg viewBox="0 0 24 24" className="size-5 stroke-fg" fill="none" strokeWidth="1.5" aria-hidden>
        <path d={side === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
      </svg>
    </button>
  );
}
