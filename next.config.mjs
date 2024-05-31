/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/sensors/data': ['./database/**/*'],
    },
  },
};

export default nextConfig;
