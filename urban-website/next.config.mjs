/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This setting disables type checking during the build process
    ignoreBuildErrors: true,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'i.pinimg.com',
            port: '',
            pathname: '/**',
            search: '',
          },
          {
            protocol: 'https',
            hostname: 'i.ibb.co.com',
            port: '',
            pathname: '/**',
            search: '',
          },
          {
            protocol: 'https',
            hostname: 'indicollection.co.uk',
            port: '',
            pathname: '/**',
            search: '',
          },
          {
            protocol: 'https',
            hostname: '*',
            port: '',
            pathname: '/**',
            search: '',
          }
        ],
    },
};

export default nextConfig;
