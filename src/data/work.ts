import type { WorkItem } from "./types";

// YOUR WORK. Order here = order on the site (put your best first).
//
// Add a video:
//   { id: "fest-aftermovie", title: "Fest Aftermovie", category: "longform",
//     video: "https://youtu.be/XXXXXXXX", client: "CVR Talkies", year: 2026 },
// Add a photo (put the file in public/photos first):
//   { id: "stage-portrait", title: "Stage Portrait", category: "photo",
//     image: "/photos/stage-portrait.webp", shape: "portrait" },
//
// Categories: "reel" | "longform" | "shoot" | "photo".
// The entries marked `sample: true` are placeholders so you can see the layout.
// They never appear on the live site. Delete them once you add real work.

export const work: WorkItem[] = [
  { id: "sample-reel-1", title: "Sample Reel", category: "reel", client: "Club", sample: true },
  { id: "sample-longform-1", title: "Sample Short Film", category: "longform", sample: true },
  { id: "sample-photo-1", title: "Sample Portrait", category: "photo", shape: "portrait", sample: true },
  { id: "sample-shoot-1", title: "Sample Event Shoot", category: "shoot", sample: true },
  { id: "sample-reel-2", title: "Sample Reel", category: "reel", sample: true },
  { id: "sample-photo-2", title: "Sample Landscape", category: "photo", shape: "landscape", sample: true },
  { id: "sample-longform-2", title: "Sample Vlog", category: "longform", sample: true },
  { id: "sample-photo-3", title: "Sample Square", category: "photo", shape: "square", sample: true },
  { id: "sample-reel-3", title: "Sample Reel", category: "reel", sample: true },
];
