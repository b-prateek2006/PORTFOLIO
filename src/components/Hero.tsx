"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { Site } from "@/data/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ site }: { site: Site }) {
  // If the intro is playing, wait for it before animating the hero in.
  const [delay] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("intro-seen") ? 0 : 1.2,
  );
  const whatsappHref = site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Prateek, I'd like to talk about a project.")}`
    : "";

  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden">
      {site.showreelLoop ? (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          src={site.showreelLoop}
          poster={site.showreelPoster || undefined}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />
      ) : (
        <div className="hero-glow absolute inset-0" aria-hidden />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-bg via-bg/30 to-transparent" aria-hidden />

      {/* Cinematic letterbox bars */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[7svh] origin-top bg-black"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay, ease }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[7svh] origin-bottom bg-black"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, delay, ease }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-[13svh] md:px-8">
        <motion.p
          className="mb-4 text-xs tracking-[0.35em] text-accent uppercase md:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        >
          {site.role}
        </motion.p>

        <h1 className="font-display leading-[0.82] uppercase">
          <span className="block overflow-hidden">
            <motion.span
              className="block text-[25vw] md:text-[17vw] xl:text-[15rem]"
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, delay: delay + 0.1, ease }}
            >
              {site.shortName}
              <span className="text-accent">.</span>
            </motion.span>
          </span>
          <span className="sr-only">{site.name}, {site.role}</span>
        </h1>

        <motion.div
          className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: delay + 0.5, ease }}
        >
          <p className="max-w-md text-lg text-fg/80 md:text-xl">{site.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#work"
              className="rounded-full border border-fg/30 px-6 py-3 text-sm font-medium transition-colors hover:border-fg hover:bg-fg hover:text-black"
            >
              See my work
            </a>
            <a
              href={whatsappHref || "#contact"}
              {...(whatsappHref ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              {whatsappHref ? "Message on WhatsApp" : "Get in touch"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
