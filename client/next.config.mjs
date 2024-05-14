/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["ac3filter.b-cdn.net", "i.scdn.co", "seed-mix-image.spotifycdn.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
