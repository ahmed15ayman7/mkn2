import { Amiri, Cairo, Great_Vibes, Montserrat } from "next/font/google";

export const fontEn = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ui-en",
});

export const fontAr = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-ui-ar",
});

export const fontQuote = Amiri({
  subsets: ["arabic", "latin"],
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
