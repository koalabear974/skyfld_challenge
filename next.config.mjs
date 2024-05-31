/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/api/sensors/data': ['./database/**/*', './tmp/**/*'],
    },
  },
};

export default nextConfig;
