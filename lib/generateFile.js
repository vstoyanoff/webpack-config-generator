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
