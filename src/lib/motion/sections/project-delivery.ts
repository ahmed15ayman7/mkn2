import { fadeUp, preset, scaleIn } from "./_helpers";

export const projectDeliveryMotion = preset({
  body: fadeUp,
  title: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  },
  media: scaleIn,
});
