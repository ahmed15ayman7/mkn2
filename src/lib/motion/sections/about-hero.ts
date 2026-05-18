import { fadeUp, preset, springs } from "./_helpers";

export const aboutHeroMotion = preset({
  title: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: springs.luxury },
  },
  body: fadeUp,
  section: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ...springs.soft, duration: 0.9 },
    },
  },
});
