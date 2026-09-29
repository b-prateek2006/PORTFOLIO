# Prateek — freelance portfolio

Dark, cinematic one-page site for my video editing, videography and photography work.
Built with Next.js (App Router), TypeScript, Tailwind CSS, Motion and Lenis.

## Run it

```bash
npm install      # first time only
npm run dev      # open http://localhost:3000
npm run build    # check the live version builds without errors
```

## Add your work (no code changes needed)

All content lives in `src/data/`:

| File | What it holds |
|---|---|
| `work.ts` | Every reel, long-form video, shoot and photo |
| `services.ts` | The three service cards (add `turnaround` / `price` when decided) |
| `testimonials.ts` | Real client quotes (section stays hidden while empty) |
| `site.ts` | Name, tagline, WhatsApp, email, socials, about text, photo, showreel |

### A video
1. Upload it to YouTube (unlisted is fine) or Instagram.
2. Add an entry at the top of `work.ts`:
   ```ts
   { id: "fest-aftermovie", title: "Fest Aftermovie", category: "longform",
     video: "https://youtu.be/XXXXXXXX", client: "CVR Talkies", year: 2026 },
   ```
   `category` is `"reel"`, `"longform"`, `"shoot"` or `"photo"`.
   YouTube thumbnails load automatically. For Instagram, also add `image: "/thumbs/name.webp"`.
3. Optional: a 3–5 second muted clip in `public/previews/` + `preview: "/previews/name.mp4"` plays when someone hovers the card.

### A photo
1. Export as `.webp` (or `.jpg`), long side about 2000px, into `public/photos/`.
2. Add: `{ id: "stage-portrait", title: "Stage Portrait", category: "photo", image: "/photos/stage-portrait.webp", shape: "portrait" }`
   `shape` is `"portrait"`, `"landscape"` or `"square"`.

Entries marked `sample: true` are placeholders: visible in `npm run dev`, never on the live site. Delete them when your real work is in.

## Contact form

Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` (free at resend.com) and `CONTACT_TO_EMAIL`.
On Vercel, add the same values under Project → Settings → Environment Variables. Never commit `.env.local`.

## Deploy

Push to GitHub, import the repo on vercel.com, add the env variables, deploy. Every push after that redeploys automatically.

## How it is built

- `src/app/page.tsx` puts the sections together; `layout.tsx` sets fonts, SEO and the intro script.
- `src/app/actions.ts` is a Server Action: validates the form with zod and sends the email with Resend on the server, so the API key never reaches the browser.
- `src/components/` has one file per section. `Work.tsx` (filters + grid) and `Lightbox.tsx` (player, keyboard + swipe) are the most interesting.
- `src/lib/video.ts` turns a normal YouTube/Instagram/Vimeo link into an embed URL and thumbnail.
- Motion respects the "reduce motion" OS setting everywhere (`MotionConfig reducedMotion="user"` + CSS media query).
