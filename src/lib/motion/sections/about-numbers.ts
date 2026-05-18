import { fadeUp, preset, scaleIn } from "./_helpers";

export const aboutNumbersMotion = preset({
  title: fadeUp,
  item: scaleIn,
  card: (i: number) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    },
  }),
});
