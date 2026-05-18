import { fadeUp, preset, scaleIn } from "./_helpers";

export const homeProjectsGridMotion = preset({
  title: fadeUp,
  body: fadeUp,
  card: (i: number) => ({
    hidden: { opacity: 0, y: 40, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  }),
});
