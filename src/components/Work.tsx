"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { categories, type WorkCategory, type WorkItem } from "@/data/types";
import { parseVideo } from "@/lib/video";
import { Lightbox } from "./Lightbox";
import { Placeholder } from "./Placeholder";

type Filter = "all" | WorkCategory;

// Shape of each card in the grid. Reels are tall (9:16), long-form is wide (16:9).
const aspectClass = (item: WorkItem) => {
  if (item.category === "reel") return "aspect-[9/16]";
  if (item.category === "photo") {
    if (item.shape === "landscape") return "aspect-[3/2]";
    if (item.shape === "square") return "aspect-square";
    return "aspect-[4/5]";
  }
  return "aspect-video";
};

export function Work({ items }: { items: WorkItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  // Only show filter buttons for categories that have at least one piece.
  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: "All" },
    ...categories.filter((c) => items.some((i) => i.category === c.id)),
  ];
  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter work">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`relative rounded-full px-5 py-2 text-sm transition-colors ${
              filter === f.id ? "text-black" : "text-muted hover:text-fg"
            }`}
          >
            {filter === f.id && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{f.label}</span>
          </button>
        ))}
      </div>

      {/* Changing the key replays the staggered entrance for the new filter. */}
      <motion.div
        key={filter}
        className="columns-2 gap-3 md:columns-3 lg:gap-5"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.06 } } }}
      >
        {visible.map((item, i) => (
          <WorkCard key={item.id} item={item} index={i} onOpen={() => setOpenIndex(i)} />
        ))}
      </motion.div>

      <Lightbox items={visible} index={openIndex} onClose={close} onChange={setOpenIndex} />
    </>
  );
}

function WorkCard({ item, index, onOpen }: { item: WorkItem; index: number; onOpen: () => void }) {
  const previewRef = useRef<HTMLVideoElement>(null);
  const video = parseVideo(item.video);
  const thumb = item.image || video?.thumbnail;
  const isVideo = item.category !== "photo";
  const meta = [item.client, item.year].filter(Boolean).join(" · ");

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => previewRef.current?.play().catch(() => {})}
      onMouseLeave={() => {
        const v = previewRef.current;
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      }}
      data-cursor={isVideo ? "Play" : "View"}
      aria-label={`${isVideo ? "Play" : "View"}: ${item.title}`}
      variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-lg bg-surface text-left lg:mb-5 ${aspectClass(item)}`}
    >
      {thumb ? (
        <Image
          src={thumb}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-cine group-hover:scale-105"
        />
      ) : (
        <Placeholder seed={index} label={item.sample ? "Sample" : item.title} />
      )}

      {item.preview && (
        <video
          ref={previewRef}
          src={item.preview}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />

      {isVideo && (
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 scale-90 items-center justify-center rounded-full bg-black/40 opacity-0 backdrop-blur transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-fg">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 translate-y-1 p-3 transition-transform duration-500 group-hover:translate-y-0 md:p-4">
        <span className="block text-sm font-medium md:text-base">{item.title}</span>
        {meta && <span className="block text-xs text-muted">{meta}</span>}
      </span>
    </motion.button>
  );
}
