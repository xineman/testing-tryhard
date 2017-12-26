process.env.NODE_ENV = 'development';

const path = require('path');
const {
  HotModuleReplacementPlugin,
  NamedModulesPlugin,
} = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge.strategy({ entry: 'prepend' })(common, {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
  ],
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    historyApiFallback: true,
    hot: true,
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    overlay: {
      warnings: true,
      errors: true,
    },
    watchOptions: {
      poll: true,
    },
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new NamedModulesPlugin(),
  ],
});
