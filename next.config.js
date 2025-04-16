module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'http://localhost/api-siteone/:path*',
        destination: 'https://www.frymburk.com/api-siteone/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
};
