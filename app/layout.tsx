import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Sola - Digital Learning Lab",
    template: "%s | Sola",
  },
  description: "Short, accessible digital learning experiences built with modern web technology.",
  openGraph: {
    title: "Sola - Digital Learning Lab",
    description: "Short, accessible digital learning experiences built with modern web technology.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <div className="page-shell">
          <SiteHeader />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <footer className="site-footer">
            <p>Sola - Digital Learning Lab</p>
            <p>Built for focused, accessible exploration.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
