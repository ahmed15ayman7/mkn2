import { fadeUp, preset } from "./_helpers";

export const projectGalleryMotion = preset({
  title: fadeUp,
  card: (i: number) => ({
    hidden: { opacity: 0, scale: 0.94, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { delay: (i % 6) * 0.07, duration: 0.5 },
    },
  }),
});
