import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  // Fixes Next's "inferred your workspace root" warning in monorepos.
  // It also ensures output file tracing is scoped to this Next app.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
