/** @type {import('next').NextConfig} */
const nextConfig = {
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
          }
        ],
    },
};

export default nextConfig;
