/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-4ec32bd5aff94e2d932ecbe7482870c5.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
