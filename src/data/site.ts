// Everything about you that appears on the site. Empty strings are hidden
// automatically (for example no WhatsApp button until you add your number).

export const site = {
  name: "B. Prateek",
  shortName: "Prateek",
  role: "Video Editor · Videographer · Photographer",
  // DRAFT: change this to how you would say it.
  tagline: "I edit reels and long-form videos, and shoot videos and photos.",
  description:
    "B. Prateek: freelance video editor, videographer and photographer. Reels, vlogs, short films, shoots and photos.",

  // Contact. WhatsApp = digits only with country code, e.g. "919876543210".
  whatsapp: "",
  email: "",
  instagram: "",
  youtube: "",
  github: "https://github.com/b-prateek2006",
  // Link to this website's public GitHub repo (shown in the footer).
  repo: "https://github.com/b-prateek2006/PORTFOLIO",

  // Optional short, muted, looping showreel for the hero (e.g. "/showreel.mp4",
  // under ~8 MB) and a poster image shown while it loads.
  showreelLoop: "",
  showreelPoster: "",

  // Optional photo of you in /public, e.g. "/me.webp".
  photo: "",
  about: [
    "I'm Prateek, a third-year B.Tech student at CVR College of Engineering.",
    "I lead photography, videography and editing for two college clubs, CVR Talkies and CVR LDC (Literature and Debate Club). I shoot and edit my own work.",
  ],
  clubs: ["CVR Talkies", "CVR LDC"],

  process: [
    { title: "Brief", text: "You tell me what you need, the idea, the date and the budget." },
    { title: "Shoot / Edit", text: "I shoot on location or start editing your footage." },
    { title: "Revisions", text: "You review the cut and I refine it until it feels right." },
    { title: "Delivery", text: "Final files, exported for where you will post them." },
  ],
};

// Live URL for SEO and share previews. Set NEXT_PUBLIC_SITE_URL after deploying.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export type Site = typeof site;
