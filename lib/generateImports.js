module.exports = options => {
  return `
/**
 * Internal dependencies
 */
const path = require('path');

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

//Store the environment variable
const mode = process.env.NODE_ENV;

//Remove Dist folder before build
rimraf.sync(path.resolve('./dist'));`;
};
