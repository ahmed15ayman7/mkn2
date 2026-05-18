import { fadeUp, preset, staggerContainer } from "./_helpers";

export const pageHeroMotion = preset({
  section: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  },
  container: staggerContainer(0.12, 0.1),
  title: {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  body: fadeUp,
});
