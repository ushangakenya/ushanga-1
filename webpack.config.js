const webpack = require('webpack');

module.exports = {
  plugins: [new webpack.ProvidePlugin({ process: 'process/browser' })],
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
      vm: require.resolve('vm-browserify'),
    },
  },
};
