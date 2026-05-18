import { fadeUp, preset, slideFromEnd, slideFromStart } from "./_helpers";

export function homeFeaturedMotion(isRtl: boolean) {
  return preset({
    title: slideFromStart(isRtl),
    body: fadeUp,
    media: slideFromEnd(isRtl),
    cta: fadeUp,
  });
}
