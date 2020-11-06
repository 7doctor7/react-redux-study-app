import Config from 'webpack-config';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default new Config().extend('config/webpack.base.config.js').merge({
  mode: 'production',
  output: {
    filename: '[name].[chunkhash:22].js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: false
      })
    ]
  }
});
