import { fadeUp, preset } from "./_helpers";

export const homeLifestyleMotion = preset({
  section: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  },
  body: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
  },
  cta: fadeUp,
});
