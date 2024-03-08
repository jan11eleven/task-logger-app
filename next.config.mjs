/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // Add your base URL here
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  },
};

export default nextConfig;
