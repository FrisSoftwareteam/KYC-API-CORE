/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // required for static build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
