module.exports = options => {
  let htmlFileExt = '.html';
  let htmlGenerationExpression = "`${page.replace('.html', '')}.html`";
  let htmlTemplatePath = '`./src/pages/${page}`';

  switch (options.htmlPreference) {
    case 'pug':
      htmlFileExt = '.pug';
      htmlGenerationExpression = "`${page.replace('.pug', '')}.html`";
      break;
    case 'handlebars':
      htmlFileExt = '.hbs';
      htmlGenerationExpression = "`${page.replace('.hbs', '')}.html`";
      break;
    default:
      break;
  }

  return `
/**
 * Internal dependencies
 */
const path = require('path');
const fs = require('fs');

/**
 * External dependencies
 */
const webpack = require('webpack');
const rimraf = require('rimraf');
${
  options.processStyles === 'yes'
    ? `const autoprefixer = require('autoprefixer');`
    : ''
}

/**
 * Plugins
 */
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
${
  options.processStyles === 'yes' && options.stylesPreference !== 'css-in-js'
    ? `const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');`
    : ''
}
${
  options.processHTML === 'yes'
    ? `const HtmlWebpackPlugin = require('html-webpack-plugin');
    const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');`
    : ''
}

//Store the environment variable
const mode = process.env.NODE_ENV;

//Remove Dist folder before build
rimraf.sync(path.resolve('./dist'));

${
  options.processHTML === 'yes'
    ? `
//Take all html files from pages folder
const pages = fs.readdirSync('./src/pages').filter(page => page.indexOf('${htmlFileExt}') !== -1);

//Generate HTML Webpack Plugin instances
const HtmlWebpackPlugins = pages.map(page => {
  return new HtmlWebpackPlugin({
    filename: ${htmlGenerationExpression},
    template: ${htmlTemplatePath},
    inject: 'head',
    hash: true,
    minify:
      mode === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      } : false,
  })
})
`
    : ''
}`;
};
