// next.config.js
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [optimizedImages, {
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'],
  }],
], {
  webpack(config) {
    config.module.rules.push({
      test: /\.gz$/,
      enforce: 'pre',
      use: 'gzip-loader',
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/assets/:slug*',
        destination: '/assets/:slug*', // adjust as per your folder structure
      },
    ];
  },
});
