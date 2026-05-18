export type VideoEmbed =
  | { kind: "youtube"; embedUrl: string; watchUrl: string }
  | { kind: "file"; src: string };

function youtubeIdFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      return id || null;
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2] ?? null;
      }
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2] ?? null;
      }
      const v = parsed.searchParams.get("v");
      return v || null;
    }
  } catch {
    return null;
  }
  return null;
}

export function resolveVideoEmbed(url: string): VideoEmbed | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  const youtubeId = youtubeIdFromUrl(trimmed);
  if (youtubeId) {
    const watchUrl =
      trimmed.includes("youtu.be") || trimmed.includes("youtube.com")
        ? trimmed
        : `https://www.youtube.com/watch?v=${youtubeId}`;
    return {
      kind: "youtube",
      embedUrl: `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`,
      watchUrl,
    };
  }

  if (/\.(mp4|webm|ogg)(\?|$)/i.test(trimmed) || trimmed.startsWith("http")) {
    return { kind: "file", src: trimmed };
  }

  return null;
}
