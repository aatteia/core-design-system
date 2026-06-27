import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — builds to ./out, no server runtime. Present locally or
  // drop on any static host.
  output: "export",
  images: { unoptimized: true },
  // Pin tracing root to this folder so Next doesn't reach into the monorepo.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
