import { fadeUp, preset, slideFromEnd } from "./_helpers";

export function contactCareersMotion(isRtl: boolean) {
  return preset({
    title: slideFromEnd(isRtl),
    cta: fadeUp,
  });
}
