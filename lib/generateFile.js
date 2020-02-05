/**
 * Internal dependencies
 */
const fs = require('fs');

/**
 * External dependencies
 */
const mkdirp = require('mkdirp');
const generateImports = require('./generateImports');
const generateEntries = require('./generateEntries');
const generatePlugins = require('./generatePlugins');
const generateLoaders = require('./generateLoaders');
const generateProductionOptions = require('./generateProductionOptions');

module.exports = options => {
  const content = `
${generateImports(options)}

module.exports = {
  mode: mode,
  devtool: mode === 'production' ? 'none' : 'source-map',
  entry: ${generateEntries(options)},
  output: {
    path: path.resolve('./dist'),
    filename: mode === 'production' ? 'js/[name].[hash].js' : 'js/[name].js',
  },
  ${
    options.splitChunks
      ? `optimization: mode === 'production' ? optimization : {},`
      : ''
  }
  ${
    options.devServer === 'yes'
      ? `devServer: {
    hot: true,
    compress: true,
    port: 9090,
    contentBase: path.resolve('./dist'),
    https: true,
    http2: true,
    index: ${
      options.processHTML === 'yes' ? `'pages/index.html'` : `'index.html'`
    },
    open: true,
    overlay: true,
  },`
      : ''
  }
  plugins: ${generatePlugins(options)},
  module: ${generateLoaders(options)},
};

${generateProductionOptions(options)}
  `;

  mkdirp.sync('generated');
  fs.writeFile('generated/webpack.config.js', content, err => {
    if (err) throw err;
    console.log('File is created successfully.');
  });
};
