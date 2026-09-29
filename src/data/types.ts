// Shapes of the content files in this folder. TypeScript uses these to warn you
// (red underline) if an entry in work.ts / services.ts is missing something.

export type WorkCategory = "reel" | "longform" | "shoot" | "photo";

export const categories: { id: WorkCategory; label: string }[] = [
  { id: "reel", label: "Reels" },
  { id: "longform", label: "Long-form" },
  { id: "shoot", label: "Shoots" },
  { id: "photo", label: "Photos" },
];

export type WorkItem = {
  /** Unique short id, lowercase with hyphens, e.g. "ldc-cc-reel". */
  id: string;
  title: string;
  category: WorkCategory;
  /** YouTube, Instagram or Vimeo link. Needed for reel, longform and shoot. */
  video?: string;
  /**
   * Image in /public, e.g. "/photos/fest.webp".
   * Photos: the photo itself. Videos: optional custom thumbnail
   * (YouTube thumbnails are fetched automatically; Instagram/Vimeo need one).
   */
  image?: string;
  /** Photos only: shape of the photo in the grid. Default "portrait". */
  shape?: "portrait" | "landscape" | "square";
  /** Optional short muted .mp4 in /public/previews that plays on hover. */
  preview?: string;
  /** Client or club, e.g. "CVR LDC". */
  client?: string;
  year?: number;
  /** Sample placeholder: shown while developing, never on the live site. */
  sample?: boolean;
};

export type Service = {
  title: string;
  blurb: string;
  includes: string[];
  /** Optional, e.g. "3–5 days". Hidden when empty. */
  turnaround?: string;
  /** Optional, e.g. "From ₹2,000". Hidden when empty. */
  price?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  /** e.g. "President, CVR LDC" */
  role?: string;
};
