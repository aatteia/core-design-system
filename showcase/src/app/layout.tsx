import type { Metadata } from "next";
import { MoodProvider } from "@/lib/mood-context";
import { ThemeProvider } from "@/lib/theme-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Core Design System 1.2 — Showcase",
  description:
    "Live token explorer and component gallery for Core, a brand-agnostic design-system foundation. Switch the brand theme to see the system rebrand from a single colour ramp.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Showcase-only. Forge and chrome moods point here; kernel faces stay in tokens.css. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <MoodProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </MoodProvider>
      </body>
    </html>
  );
}
