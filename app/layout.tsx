import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import FolioRail from "@/components/FolioRail";
import Footer from "@/components/Footer";
import LenisProvider from "@/components/LenisProvider";
import Nav from "@/components/Nav";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_IMAGE,
} from "@/lib/metadata";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const source = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Habihan | The fashion image house",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  category: "fashion",
  creator: SITE_NAME,
  publisher: SITE_NAME,
  openGraph: {
    title: "Habihan | The fashion image house",
    description: SITE_DESCRIPTION,
    url: "/",
    type: "website",
    siteName: SITE_NAME,
    locale: "en_PH",
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Habihan | The fashion image house",
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${source.variable} ${plex.variable}`}
    >
      <body>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <FolioRail />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <LenisProvider />
      </body>
    </html>
  );
}
