import { fadeIn, preset } from "./_helpers";

export const homeMarqueeMotion = preset({
  section: fadeIn,
  item: {
    hidden: { opacity: 0, scaleX: 0.6 },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  },
});
