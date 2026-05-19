import {
  Amiri,
  Great_Vibes,
  IBM_Plex_Sans_Arabic,
  Montserrat,
} from "next/font/google";

/** Latin UI — headings & body in English */
export const fontEn = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ui-en",
});

/**
 * Arabic UI — geometric sans close to the official Saudi typeface (الخط السعودي).
 * Used for all Arabic text when `dir="rtl"` via globals.css font tokens.
 */
export const fontAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ui-ar",
});

/** Decorative quotes in English (Arabic uses --font-ui-ar in RTL) */
export const fontQuote = Amiri({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-quote",
});

export const fontSignature = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-signature",
});
