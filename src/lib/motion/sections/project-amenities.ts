import { fadeUp, preset, scaleIn } from "./_helpers";

export const projectAmenitiesMotion = preset({
  title: fadeUp,
  card: (i: number) => ({
    hidden: { opacity: 0, rotateY: -12, scale: 0.95 },
    visible: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: { delay: i * 0.06, duration: 0.45 },
    },
  }),
});
