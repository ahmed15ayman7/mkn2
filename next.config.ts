import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { buildImageRemotePatterns } from "./src/lib/image/remote-patterns";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: buildImageRemotePatterns(),
  },
};

export default withNextIntl(nextConfig);
