import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Limit output file tracing strictly to the client app directory
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
