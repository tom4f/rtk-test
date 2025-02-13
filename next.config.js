module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        //destination: 'http://localhost/api-siteone/:path*',
        destination: 'https://www.frymburk.com/api-siteone/:path*',
      },
    ];
  },
};
