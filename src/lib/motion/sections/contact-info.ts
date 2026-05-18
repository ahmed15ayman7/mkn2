import { fadeUp, preset } from "./_helpers";

export const contactInfoMotion = preset({
  column: (i: number) => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.5 },
    },
  }),
  title: fadeUp,
});
