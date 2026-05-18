import { Cairo, Montserrat, Amiri } from "next/font/google";

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
