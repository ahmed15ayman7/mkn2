import { fadeUp, preset, scaleIn, slideFromEnd, slideFromStart } from "./_helpers";

export function aboutChairmanMotion(isRtl: boolean) {
  return preset({
    media: slideFromStart(isRtl),
    kicker: fadeUp,
    title: fadeUp,
    body: {
      hidden: { opacity: 0, filter: "blur(6px)" },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.8 },
      },
    },
    cta: scaleIn,
  });
}
