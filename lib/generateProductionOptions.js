module.exports = options => {
  return `
//Add plugins for production use
if (mode === 'production') {
  module.exports.plugins.push(
    new UglifyJsPlugin({
      parallel: true,
    }),
    ${
      options.processStyles === 'yes' &&
      options.stylesPreference !== 'css-in-js'
        ? `new FixStyleOnlyEntriesPlugin(),`
        : ''
    }
  );
}
  `;
};
