import type { Metadata } from "next";
import Script from "next/script";
import { Geist, IBM_Plex_Sans } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppFab from "@/components/WhatsAppFab";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import { PHONE_E164, EMAIL } from "@/lib/contact";
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

const title = "Surendhar Venkatesh — Digital Studio";
const description =
  "A digital studio of one: websites, social media, and digital products built to make small businesses easier to trust and easier to buy from.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  // Search Console ownership for the URL-prefix property
  // https://surendhar-space.vercel.app/. DNS verification was not an option:
  // that method proves a Domain property by TXT record at the registrar, and
  // nobody but Vercel can add records under vercel.app. Google issues a
  // separate token per method, so this is not the DNS string.
  //
  // Rendered site-wide rather than on "/" alone because Next puts it in the
  // head of every page, which costs nothing and keeps the property verified if
  // the homepage ever changes shape.
  //
  // Registering a real domain does not retire this. That will be a *separate*
  // Search Console property with its own token, and keeping this one verified
  // is what lets the old host be watched through the migration -- which is the
  // window where the 301 either works or quietly does not.
  verification: {
    google: "n2vSCUvXfXFhgnQO6BFN0onFDbcCdMwvyCyzXgnIRHU",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Surendhar Venkatesh",
  url: SITE_URL,
  image: `${SITE_URL}/assets/profile.webp`,
  email: EMAIL,
  telephone: PHONE_E164,
  jobTitle: "Digital Studio — Websites, Social Media & Digital Products",
  // Only properties the pages actually display. "Tamil Nadu" was asserted here
  // while every page shows "Chennai, India" and nothing else -- structured data
  // has to reflect visible content, and the region buys no rich result on a
  // Person anyway. Locality and country are both on the page, so both stay.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/in/surendhar-venkatesh",
    "https://www.instagram.com/surendhar_space/",
  ],
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${plexSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <WhatsAppFab />
        <SmoothScroll />
      </body>
    </html>
  );
}
