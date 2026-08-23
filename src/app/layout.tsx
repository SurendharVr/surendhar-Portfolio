import type { Metadata } from "next";
import { Geist, IBM_Plex_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import "./site.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Surendhar Venkatesh — Digital Studio",
  description:
    "Surendhar Venkatesh is a digital studio of one: websites, social media, and digital products built to make small businesses easier to trust and easier to buy from — backed by 10+ years in sales.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${plexSans.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <SmoothScroll />
      </body>
    </html>
  );
}
