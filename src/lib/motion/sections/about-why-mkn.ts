import { fadeUp, preset, slideFromStart } from "./_helpers";

export const aboutWhyMknMotion = preset({
  kicker: fadeUp,
  title: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  },
  body: slideFromStart(false),
});
