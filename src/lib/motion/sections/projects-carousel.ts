import { fadeUp, preset, slideFromEnd } from "./_helpers";

export function projectsCarouselMotion(isRtl: boolean) {
  return preset({
    kicker: fadeUp,
    title: fadeUp,
    body: fadeUp,
    media: slideFromEnd(isRtl),
  });
}
