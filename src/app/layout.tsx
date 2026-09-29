import type { Metadata, Viewport } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { site, siteUrl } from "@/data/site";
import { Providers } from "@/components/Providers";
import { Cursor } from "@/components/Cursor";

// next/font downloads the fonts at build time and serves them from your own
// site (faster, no layout jump). They are exposed as CSS variables.
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const title = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.description,
  openGraph: { title, description: site.description, type: "website", url: "/" },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

// Runs before the page paints: skip the intro if it already played this session.
const introScript = `try{if(sessionStorage.getItem("intro-seen"))document.documentElement.classList.add("intro-seen");else sessionStorage.setItem("intro-seen","1")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="bg-bg font-sans text-fg antialiased">
        <Providers>
          {children}
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
