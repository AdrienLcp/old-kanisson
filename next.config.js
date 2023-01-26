/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ['i.ytimg.com']
    remotePatterns: [{
      protocol: "https",
      hostname: "**",
      pathname: "/**"
    }]
  }
};

module.exports = nextConfig;