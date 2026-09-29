// Turns a normal YouTube / Instagram / Vimeo link into an embeddable player URL
// (and a thumbnail for YouTube), so work.ts only needs the link you copy.

export type ParsedVideo = {
  provider: "youtube" | "instagram" | "vimeo";
  id: string;
  embedUrl: string;
  thumbnail?: string;
};

export function parseVideo(url?: string): ParsedVideo | null {
  if (!url) return null;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  const host = u.hostname.replace(/^(www\.|m\.)/, "");

  if (host === "youtu.be" || host === "youtube.com" || host === "youtube-nocookie.com") {
    let id: string | null = null;
    if (host === "youtu.be") id = u.pathname.slice(1).split("/")[0] || null;
    else if (u.pathname === "/watch") id = u.searchParams.get("v");
    else id = u.pathname.match(/^\/(?:shorts|embed|live)\/([^/?]+)/)?.[1] ?? null;
    if (!id) return null;
    return {
      provider: "youtube",
      id,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`,
      thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    };
  }

  if (host === "instagram.com") {
    const id = u.pathname.match(/^\/(?:[^/]+\/)?(?:reels?|p|tv)\/([^/?]+)/)?.[1];
    if (!id) return null;
    return { provider: "instagram", id, embedUrl: `https://www.instagram.com/p/${id}/embed` };
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const id = u.pathname.match(/(\d{5,})/)?.[1];
    if (!id) return null;
    return { provider: "vimeo", id, embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1` };
  }

  return null;
}
