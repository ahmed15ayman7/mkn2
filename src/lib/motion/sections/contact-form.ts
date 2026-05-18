import { fadeUp, preset } from "./_helpers";

export const contactFormMotion = preset({
  title: fadeUp,
  item: (i: number) => ({
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.06, duration: 0.45 },
    },
  }),
});
