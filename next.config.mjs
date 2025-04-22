/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure static files are properly handled in production
  output: "standalone",
  // Configure image domains if needed
  images: {
    domains: [],
    unoptimized: true,
  },
};

export default nextConfig;
