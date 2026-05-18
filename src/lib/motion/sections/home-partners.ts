import { fadeUp, preset, slideFromStart } from "./_helpers";

export const homePartnersMotion = preset({
  kicker: fadeUp,
  title: {
    hidden: { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.55 } },
  },
  media: slideFromStart(false),
});
