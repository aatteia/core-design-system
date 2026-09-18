import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

const repoRoot = path.join(__dirname, "..");
const destDir = path.join(__dirname, "src", "app");

function syncCoreCss(): void {
  const tokensSrc = path.join(repoRoot, "tokens.css");
  const componentsSrc = path.join(repoRoot, "components.css");
  if (!fs.existsSync(tokensSrc) || !fs.existsSync(componentsSrc)) {
    throw new Error("Cannot find tokens.css or components.css at the repository root.");
  }
  const tokens = fs
    .readFileSync(tokensSrc, "utf8")
    .replaceAll('url("fonts/', 'url("/fonts/');
  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(path.join(destDir, "core-tokens.css"), tokens);
  fs.copyFileSync(componentsSrc, path.join(destDir, "core-components.css"));
}

syncCoreCss();

const nextConfig: NextConfig = {
  // Static export — builds to ./out, no server runtime. Present locally or
  // drop on any static host.
  output: "export",
  images: { unoptimized: true },
  // Pin tracing root to this folder so Next doesn't reach into the monorepo.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
