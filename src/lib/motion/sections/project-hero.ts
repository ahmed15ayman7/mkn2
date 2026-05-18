import { fadeUp, preset, springs } from "./_helpers";

export const projectHeroMotion = preset({
  item: {
    hidden: { opacity: 0, y: 48, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: springs.luxury,
    },
  },
  title: fadeUp,
});
