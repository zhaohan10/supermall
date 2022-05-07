const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { transformElementScss } = require('ele-admin/lib/utils/dynamic-theme');

module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  transpileDependencies: ['element-ui', 'ele-admin', 'vue-i18n'],
  chainWebpack(config) {
    config.plugins.delete('prefetch');
    if (process.env.NODE_ENV !== 'development') {
      // 对超过10kb的文件gzip压缩
      config.plugin('compressionPlugin').use(
        new CompressionWebpackPlugin({
          test: /\.(js|css|html)$/,
          threshold: 10240
        })
      );
    }
  },
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
          outputStyle: 'expanded',
          importer: transformElementScss()
        }
      }
    }
  }
};
