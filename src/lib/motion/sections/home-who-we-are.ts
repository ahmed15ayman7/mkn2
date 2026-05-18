import { fadeUp, preset, scaleIn, slideFromStart, springs } from "./_helpers";

export const homeWhoWeAreMotion = preset({
  kicker: {
    hidden: { opacity: 0, letterSpacing: "0.4em" },
    visible: {
      opacity: 1,
      letterSpacing: "0.22em",
      transition: { duration: 0.6 },
    },
  },
  title: {
    hidden: { opacity: 0, y: 48, clipPath: "inset(0 100% 0 0)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0% 0 0)",
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
  },
  body: fadeUp,
  cta: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: springs.snappy },
  },
  media: (i: number) => ({
    hidden: { opacity: 0, scale: 0.75, rotate: -12 + i * 8 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { ...springs.snappy, delay: i * 0.12 },
    },
  }),
  item: slideFromStart(false),
});
