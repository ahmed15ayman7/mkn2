import { fadeUp, preset } from "./_helpers";

export const siteFooterMotion = preset({
  column: (i: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.45 },
    },
  }),
});
